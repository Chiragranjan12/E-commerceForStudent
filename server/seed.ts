import { db } from "./db";
import { products, categories } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  const categoryData = [
    { name: "Footwear", description: "Avant-garde footwear" },
    { name: "Apparel", description: "Raw streetwear" },
    { name: "Accessories", description: "Tech accessories" },
    { name: "Objects", description: "Industrial artifacts" },
  ];

  for (const cat of categoryData) {
    await db.insert(categories).values(cat).onConflictDoNothing();
  }

  const productData = [
    {
      name: "Chrome Stompers V2",
      description: "Metallic silver boots with futuristic design. Post-industrial aesthetic meets street-level rebellion. Limited edition run.",
      price: "450.00",
      imageUrl: "/assets/generated_images/metallic_silver_boots,_avant-garde_fashion_object.png",
      category: "Footwear",
      stock: 12,
    },
    {
      name: "Void Hoodie",
      description: "Oversized heavyweight black hoodie. Distressed edges, raw construction. The anti-establishment uniform.",
      price: "180.00",
      imageUrl: "/assets/generated_images/oversized_black_hoodie,_streetwear_ghost_mannequin.png",
      category: "Apparel",
      stock: 24,
    },
    {
      name: "Tech Tote 001",
      description: "Transparent acrylic tote with industrial metal hardware. Visibility as a design statement.",
      price: "220.00",
      imageUrl: "/assets/generated_images/transparent_acrylic_bag,_industrial_hardware.png",
      category: "Accessories",
      stock: 18,
    },
    {
      name: "Artifact No. 9",
      description: "Abstract chrome geometric sculpture. A statement piece for the aesthetically aggressive. Museum-quality brutalism.",
      price: "800.00",
      imageUrl: "/assets/generated_images/abstract_chrome_sculpture,_industrial_artifact.png",
      category: "Objects",
      stock: 5,
    },
    {
      name: "Monolith Jacket",
      description: "Structured black technical jacket. Waterproof shell with hidden pockets. Architecture for the body.",
      price: "420.00",
      imageUrl: "/assets/generated_images/oversized_black_hoodie,_streetwear_ghost_mannequin.png",
      category: "Apparel",
      stock: 15,
    },
    {
      name: "Grid Runner Low",
      description: "Minimal white sneaker with exposed construction. Form follows function, brutally.",
      price: "320.00",
      imageUrl: "/assets/generated_images/metallic_silver_boots,_avant-garde_fashion_object.png",
      category: "Footwear",
      stock: 30,
    },
    {
      name: "Chain Link Utility Belt",
      description: "Industrial chain belt with carabiners. Function as aesthetic. Carry the chaos.",
      price: "95.00",
      imageUrl: "/assets/generated_images/transparent_acrylic_bag,_industrial_hardware.png",
      category: "Accessories",
      stock: 40,
    },
    {
      name: "Concrete Clock",
      description: "Cast concrete wall clock. Time, materialized. Brutalist timekeeping.",
      price: "280.00",
      imageUrl: "/assets/generated_images/abstract_chrome_sculpture,_industrial_artifact.png",
      category: "Objects",
      stock: 8,
    },
  ];

  for (const product of productData) {
    await db.insert(products).values(product).onConflictDoNothing();
  }

  console.log("Database seeded successfully!");
}

seed().catch(console.error).finally(() => process.exit());
