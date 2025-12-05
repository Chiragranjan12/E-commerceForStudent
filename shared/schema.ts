import { pgTable, text, integer, serial, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  stock: integer("stock").notNull().default(0),
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  addedAt: timestamp("added_at").notNull().defaultNow(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true, addedAt: true });

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;
