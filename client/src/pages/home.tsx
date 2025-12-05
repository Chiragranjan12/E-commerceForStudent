import { NavBar } from "@/components/layout/NavBar";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

import bootsImg from "@assets/generated_images/metallic_silver_boots,_avant-garde_fashion_object.png";
import sculptureImg from "@assets/generated_images/abstract_chrome_sculpture,_industrial_artifact.png";
import hoodieImg from "@assets/generated_images/oversized_black_hoodie,_streetwear_ghost_mannequin.png";

export default function Home() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
  });

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent selection:text-white">
      <NavBar />

      {/* Hero Section */}
      <section className="relative w-full border-b-2 border-black grid md:grid-cols-2 min-h-[80vh]">
        <div className="relative flex flex-col justify-center p-8 md:p-16 border-r-2 border-black bg-white">
          <div className="space-y-6 relative z-10">
            <div className="inline-block bg-black text-white px-4 py-1 font-mono text-sm font-bold uppercase tracking-widest mb-4">
              Season 04 / Chaos
            </div>
            <h1 className="font-display text-8xl md:text-9xl leading-[0.8] font-bold tracking-tighter uppercase">
              Reject<br/>
              <span className="text-stroke">Tradition</span><br/>
              Embrace<br/>
              <span className="text-accent">Chaos</span>
            </h1>
            <p className="font-mono text-lg max-w-md mt-8 leading-relaxed">
              A curated collection of raw artifacts for the post-industrial age. 
              Designed in the void. Manufactured for the streets.
            </p>
            <div className="pt-8 flex gap-4">
              <Button 
                data-testid="button-shop-drop"
                className="h-14 px-8 rounded-none bg-black text-white hover:bg-accent hover:text-white text-lg font-display tracking-wide uppercase border-2 border-black transition-all hover:brutal-shadow"
              >
                Shop The Drop
              </Button>
              <Button 
                data-testid="button-lookbook"
                variant="outline" 
                className="h-14 px-8 rounded-none border-2 border-black text-black hover:bg-black hover:text-white text-lg font-display tracking-wide uppercase"
              >
                View Lookbook
              </Button>
            </div>
          </div>
          
          <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none"></div>
        </div>

        <div className="relative bg-gray-100 flex items-center justify-center overflow-hidden border-t-2 md:border-t-0 border-black">
          <img 
            src={bootsImg} 
            alt="Hero Product" 
            className="w-[80%] h-auto object-contain drop-shadow-2xl mix-blend-multiply"
          />
          <div className="absolute bottom-8 right-8 bg-white border-2 border-black p-4 font-mono text-xs">
            <p>FEATURED ITEM:</p>
            <p className="font-bold text-lg">CHROME STOMPERS V2</p>
            <p>REF: 8892-A</p>
          </div>
        </div>
      </section>

      {/* Marquee Separator */}
      <div className="bg-accent text-white border-b-2 border-black py-4 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content font-display text-6xl font-bold uppercase tracking-tighter">
            New Arrivals • Limited Stock • Secure Your Artifact • Future Ready • 
            New Arrivals • Limited Stock • Secure Your Artifact • Future Ready • 
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-end mb-12 border-b-2 border-black pb-4">
          <h2 className="font-display text-7xl font-bold tracking-tighter uppercase">
            Latest<br/>Drops
          </h2>
          <Button 
            data-testid="button-view-all"
            variant="link" 
            className="font-mono uppercase text-black hover:text-accent decoration-2 underline-offset-4 text-lg"
          >
            View All Products <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border-2 border-black bg-white p-4 animate-pulse">
                <div className="aspect-square bg-gray-200 mb-4"></div>
                <div className="h-4 bg-gray-200 mb-2"></div>
                <div className="h-4 bg-gray-200 w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                id={product.id.toString()}
                title={product.name}
                price={`$${parseFloat(product.price).toFixed(2)}`}
                image={product.imageUrl}
                category={product.category}
                isNew={product.stock > 0 && product.stock < 20}
              />
            ))}
          </div>
        )}
      </section>

      {/* Editorial Section */}
      <section className="border-t-2 border-black bg-black text-white">
        <div className="grid md:grid-cols-2">
          <div className="p-12 md:p-24 flex flex-col justify-center border-r-2 border-white/20">
            <Star className="w-16 h-16 text-accent mb-8 animate-spin-slow" />
            <h2 className="font-display text-6xl md:text-8xl font-bold uppercase leading-none mb-8">
              The<br/>Underground<br/>Standard
            </h2>
            <p className="font-mono text-gray-400 text-lg max-w-md mb-8">
              We don't just sell products. We curate a lifestyle for the aesthetically aggressive. 
              Join the movement or get left behind in the generic void.
            </p>
            <Button 
              data-testid="button-manifesto"
              className="self-start rounded-none border-2 border-white bg-transparent hover:bg-white hover:text-black text-white h-14 px-8 font-display text-xl uppercase transition-colors"
            >
              Read Manifesto
            </Button>
          </div>
          <div className="relative min-h-[400px]">
            <img 
              src={sculptureImg} 
              alt="Editorial" 
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125" 
            />
            <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-9xl font-bold text-transparent text-stroke-white opacity-50">
                EST. 2025
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-black pt-16 pb-8 px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-display text-5xl font-bold tracking-tighter mb-6">UN/KNOWN</h3>
              <p className="font-mono text-sm max-w-xs text-muted-foreground">
                Digital brutalism for the modern consumer. 
                Based in the cloud. Accessible everywhere.
              </p>
            </div>
            <div>
              <h4 className="font-mono font-bold uppercase mb-4">Shop</h4>
              <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                <li className="hover:text-black cursor-pointer">All Products</li>
                <li className="hover:text-black cursor-pointer">New Arrivals</li>
                <li className="hover:text-black cursor-pointer">Accessories</li>
                <li className="hover:text-black cursor-pointer">Archive</li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono font-bold uppercase mb-4">Legal</h4>
              <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                <li className="hover:text-black cursor-pointer">Terms of Service</li>
                <li className="hover:text-black cursor-pointer">Privacy Policy</li>
                <li className="hover:text-black cursor-pointer">Returns</li>
                <li className="hover:text-black cursor-pointer">Shipping</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t-2 border-black">
            <p className="font-mono text-xs uppercase text-muted-foreground">
              © 2025 UN/KNOWN Systems. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <div className="w-8 h-8 bg-black hover:bg-accent transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 bg-black hover:bg-accent transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 bg-black hover:bg-accent transition-colors cursor-pointer"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
