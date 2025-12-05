import { db } from "./db";
import { products, categories } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(products);
  await db.delete(categories);

  const categoryData = [
    { name: "Footwear", description: "Avant-garde footwear for the streets" },
    { name: "Tops", description: "Shirts, tees, and layering pieces" },
    { name: "Bottoms", description: "Pants, shorts, and structured pieces" },
    { name: "Outerwear", description: "Jackets, coats, and shells" },
    { name: "Headwear", description: "Hats, caps, and head accessories" },
    { name: "Accessories", description: "Bags, belts, and tech accessories" },
    { name: "Jewelry", description: "Industrial chains and brutalist pieces" },
    { name: "Objects", description: "Art pieces and home artifacts" },
  ];

  for (const cat of categoryData) {
    await db.insert(categories).values(cat);
  }

  const productData = [
    // Footwear
    {
      name: "Chrome Stompers V2",
      description: "Metallic silver boots with futuristic design. Post-industrial aesthetic meets street-level rebellion. Limited edition run.",
      price: "450.00",
      imageUrl: "/assets/generated_images/metallic_silver_boots,_avant-garde_fashion_object.png",
      category: "Footwear",
      stock: 12,
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
      name: "Void Platform",
      description: "Elevated platform boots. Industrial sole unit with aggressive tread pattern.",
      price: "520.00",
      imageUrl: "/assets/generated_images/metallic_silver_boots,_avant-garde_fashion_object.png",
      category: "Footwear",
      stock: 8,
    },
    {
      name: "Concrete Slides",
      description: "Architectural slide sandal. Molded footbed with brutalist aesthetic.",
      price: "180.00",
      imageUrl: "/assets/generated_images/metallic_silver_boots,_avant-garde_fashion_object.png",
      category: "Footwear",
      stock: 25,
    },

    // Tops
    {
      name: "Void Tee",
      description: "Heavyweight cotton t-shirt. Oversized fit with dropped shoulders. The essential.",
      price: "85.00",
      imageUrl: "/assets/generated_images/black_oversized_streetwear_t-shirt.png",
      category: "Tops",
      stock: 50,
    },
    {
      name: "Grid Logo Tee",
      description: "Box logo graphic tee. Brutalist typography on heavyweight cotton.",
      price: "95.00",
      imageUrl: "/assets/generated_images/black_oversized_streetwear_t-shirt.png",
      category: "Tops",
      stock: 40,
    },
    {
      name: "Mesh Layer Top",
      description: "Transparent mesh long-sleeve. Industrial aesthetic for layering.",
      price: "120.00",
      imageUrl: "/assets/generated_images/black_oversized_streetwear_t-shirt.png",
      category: "Tops",
      stock: 20,
    },
    {
      name: "Void Hoodie",
      description: "Oversized heavyweight black hoodie. Distressed edges, raw construction. The anti-establishment uniform.",
      price: "180.00",
      imageUrl: "/assets/generated_images/oversized_black_hoodie,_streetwear_ghost_mannequin.png",
      category: "Tops",
      stock: 24,
    },
    {
      name: "Thermal Base Layer",
      description: "Technical thermal top. Grid-pattern knit with thumb holes.",
      price: "140.00",
      imageUrl: "/assets/generated_images/black_oversized_streetwear_t-shirt.png",
      category: "Tops",
      stock: 18,
    },

    // Bottoms
    {
      name: "Cargo Pant 001",
      description: "Multi-pocket cargo pant. Technical fabric with utility straps.",
      price: "280.00",
      imageUrl: "/assets/generated_images/black_techwear_cargo_pants.png",
      category: "Bottoms",
      stock: 22,
    },
    {
      name: "Wide Leg Trouser",
      description: "Architectural wide-leg pant. Structured wool blend with sharp creases.",
      price: "320.00",
      imageUrl: "/assets/generated_images/black_techwear_cargo_pants.png",
      category: "Bottoms",
      stock: 15,
    },
    {
      name: "Utility Short",
      description: "Technical cargo shorts. Multiple pockets with snap closures.",
      price: "160.00",
      imageUrl: "/assets/generated_images/black_techwear_cargo_pants.png",
      category: "Bottoms",
      stock: 30,
    },
    {
      name: "Void Sweatpant",
      description: "Heavyweight fleece jogger. Tapered fit with industrial drawcord.",
      price: "165.00",
      imageUrl: "/assets/generated_images/black_techwear_cargo_pants.png",
      category: "Bottoms",
      stock: 35,
    },

    // Outerwear
    {
      name: "Monolith Jacket",
      description: "Structured black technical jacket. Waterproof shell with hidden pockets. Architecture for the body.",
      price: "420.00",
      imageUrl: "/assets/generated_images/oversized_black_hoodie,_streetwear_ghost_mannequin.png",
      category: "Outerwear",
      stock: 15,
    },
    {
      name: "Puffer 001",
      description: "Oversized puffer jacket. Matte black finish with industrial hardware.",
      price: "480.00",
      imageUrl: "/assets/generated_images/oversized_black_hoodie,_streetwear_ghost_mannequin.png",
      category: "Outerwear",
      stock: 10,
    },
    {
      name: "Trench Coat",
      description: "Extended length trench. Water-resistant cotton with belt detail.",
      price: "550.00",
      imageUrl: "/assets/generated_images/oversized_black_hoodie,_streetwear_ghost_mannequin.png",
      category: "Outerwear",
      stock: 8,
    },
    {
      name: "Bomber Shell",
      description: "Technical bomber jacket. Ribbed collar and cuffs with hidden zip.",
      price: "380.00",
      imageUrl: "/assets/generated_images/oversized_black_hoodie,_streetwear_ghost_mannequin.png",
      category: "Outerwear",
      stock: 12,
    },

    // Headwear
    {
      name: "Bucket Hat",
      description: "Classic bucket hat. Washed cotton with embroidered logo.",
      price: "65.00",
      imageUrl: "/assets/generated_images/black_minimalist_bucket_hat.png",
      category: "Headwear",
      stock: 45,
    },
    {
      name: "Dad Cap",
      description: "Unstructured 6-panel cap. Tonal embroidery on washed cotton.",
      price: "55.00",
      imageUrl: "/assets/generated_images/black_minimalist_bucket_hat.png",
      category: "Headwear",
      stock: 60,
    },
    {
      name: "Beanie",
      description: "Ribbed knit beanie. Heavyweight wool blend with logo patch.",
      price: "45.00",
      imageUrl: "/assets/generated_images/black_minimalist_bucket_hat.png",
      category: "Headwear",
      stock: 70,
    },
    {
      name: "Balaclava",
      description: "Full coverage knit balaclava. Technical yarn with face opening.",
      price: "75.00",
      imageUrl: "/assets/generated_images/black_minimalist_bucket_hat.png",
      category: "Headwear",
      stock: 25,
    },

    // Accessories
    {
      name: "Tech Tote 001",
      description: "Transparent acrylic tote with industrial metal hardware. Visibility as a design statement.",
      price: "220.00",
      imageUrl: "/assets/generated_images/transparent_acrylic_bag,_industrial_hardware.png",
      category: "Accessories",
      stock: 18,
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
      name: "Crossbody Bag",
      description: "Compact crossbody with multiple compartments. Technical nylon with metal hardware.",
      price: "165.00",
      imageUrl: "/assets/generated_images/transparent_acrylic_bag,_industrial_hardware.png",
      category: "Accessories",
      stock: 28,
    },
    {
      name: "Utility Pouch",
      description: "Modular belt pouch. Attach to any belt or strap system.",
      price: "85.00",
      imageUrl: "/assets/generated_images/transparent_acrylic_bag,_industrial_hardware.png",
      category: "Accessories",
      stock: 35,
    },
    {
      name: "Phone Lanyard",
      description: "Adjustable phone lanyard system. Industrial cord with metal clips.",
      price: "45.00",
      imageUrl: "/assets/generated_images/transparent_acrylic_bag,_industrial_hardware.png",
      category: "Accessories",
      stock: 50,
    },

    // Jewelry
    {
      name: "Chain Necklace",
      description: "Chunky industrial chain. Silver-tone metal with toggle clasp.",
      price: "120.00",
      imageUrl: "/assets/generated_images/industrial_silver_chain_necklace.png",
      category: "Jewelry",
      stock: 30,
    },
    {
      name: "Link Bracelet",
      description: "Heavy link bracelet. Brutalist design in silver-tone metal.",
      price: "85.00",
      imageUrl: "/assets/generated_images/industrial_silver_chain_necklace.png",
      category: "Jewelry",
      stock: 35,
    },
    {
      name: "Ear Cuff Set",
      description: "Set of 3 industrial ear cuffs. No piercing required.",
      price: "65.00",
      imageUrl: "/assets/generated_images/industrial_silver_chain_necklace.png",
      category: "Jewelry",
      stock: 40,
    },
    {
      name: "Signet Ring",
      description: "Oversized signet ring. Engraved logo on brushed metal.",
      price: "95.00",
      imageUrl: "/assets/generated_images/industrial_silver_chain_necklace.png",
      category: "Jewelry",
      stock: 25,
    },

    // Objects
    {
      name: "Artifact No. 9",
      description: "Abstract chrome geometric sculpture. A statement piece for the aesthetically aggressive. Museum-quality brutalism.",
      price: "800.00",
      imageUrl: "/assets/generated_images/abstract_chrome_sculpture,_industrial_artifact.png",
      category: "Objects",
      stock: 5,
    },
    {
      name: "Concrete Clock",
      description: "Cast concrete wall clock. Time, materialized. Brutalist timekeeping.",
      price: "280.00",
      imageUrl: "/assets/generated_images/abstract_chrome_sculpture,_industrial_artifact.png",
      category: "Objects",
      stock: 8,
    },
    {
      name: "Metal Vase",
      description: "Welded metal vase. Industrial aesthetic for flora display.",
      price: "220.00",
      imageUrl: "/assets/generated_images/abstract_chrome_sculpture,_industrial_artifact.png",
      category: "Objects",
      stock: 12,
    },
    {
      name: "Concrete Bookends",
      description: "Pair of cast concrete bookends. Raw industrial finish.",
      price: "145.00",
      imageUrl: "/assets/generated_images/abstract_chrome_sculpture,_industrial_artifact.png",
      category: "Objects",
      stock: 15,
    },
  ];

  for (const product of productData) {
    await db.insert(products).values(product);
  }

  console.log(`Seeded ${categoryData.length} categories and ${productData.length} products!`);
}

seed().catch(console.error).finally(() => process.exit());
