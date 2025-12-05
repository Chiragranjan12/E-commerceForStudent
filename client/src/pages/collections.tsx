import { NavBar } from "@/components/layout/NavBar";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "wouter";
import type { Product, Category } from "@shared/schema";
import { Filter, X, Grid, List } from "lucide-react";

export default function Collections() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const initialCategory = urlParams.get("category") || "all";
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      return response.json();
    },
  });

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      const url = selectedCategory === "all" 
        ? "/api/products" 
        : `/api/products/category/${selectedCategory}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
  });

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return b.id - a.id;
    }
  });

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent selection:text-white">
      <NavBar />

      {/* Page Header */}
      <section className="border-b-2 border-black bg-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="font-display text-7xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
            {selectedCategory === "all" ? "All Products" : selectedCategory}
          </h1>
          <p className="font-mono text-lg text-muted-foreground max-w-xl">
            {selectedCategory === "all" 
              ? "Browse the complete collection of raw artifacts and brutalist essentials."
              : `Explore our ${selectedCategory.toLowerCase()} collection.`}
          </p>
        </div>
      </section>

      {/* Category Pills - Mobile Scrollable */}
      <section className="border-b-2 border-black bg-white sticky top-[104px] z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              data-testid="filter-all"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-none border-2 border-black font-mono text-sm uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedCategory === "all"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white"
              }`}
            >
              All ({products.length})
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                data-testid={`filter-${cat.name.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat.name)}
                className={`rounded-none border-2 border-black font-mono text-sm uppercase tracking-wider whitespace-nowrap transition-colors ${
                  selectedCategory === cat.name
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black hover:text-white"
                }`}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="border-b-2 border-black bg-gray-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              data-testid="button-toggle-filters"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-none border-2 border-black font-mono text-xs uppercase md:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <span className="font-mono text-sm text-muted-foreground">
              {sortedProducts.length} {sortedProducts.length === 1 ? "item" : "items"}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <select
              data-testid="select-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-2 border-black rounded-none px-3 py-2 font-mono text-sm uppercase cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto p-4 md:p-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-[180px]">
              <h3 className="font-display text-2xl font-bold uppercase mb-6 pb-2 border-b-2 border-black">
                Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    data-testid="sidebar-filter-all"
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left font-mono text-sm uppercase py-2 px-3 transition-colors ${
                      selectedCategory === "all"
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    All Products
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      data-testid={`sidebar-filter-${cat.name.toLowerCase()}`}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left font-mono text-sm uppercase py-2 px-3 transition-colors ${
                        selectedCategory === cat.name
                          ? "bg-black text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t-2 border-black">
                <h3 className="font-display text-2xl font-bold uppercase mb-4">
                  Info
                </h3>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                  Free shipping on orders over $300. All sales final. 
                  Items ship within 3-5 business days.
                </p>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border-2 border-black bg-white p-4 animate-pulse">
                    <div className="aspect-square bg-gray-200 mb-4"></div>
                    <div className="h-4 bg-gray-200 mb-2"></div>
                    <div className="h-4 bg-gray-200 w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-20 border-2 border-black bg-white">
                <p className="font-display text-4xl font-bold uppercase mb-4">No Products Found</p>
                <p className="font-mono text-muted-foreground mb-6">
                  Try selecting a different category.
                </p>
                <Button
                  onClick={() => setSelectedCategory("all")}
                  className="rounded-none border-2 border-black bg-black text-white hover:bg-accent font-mono uppercase"
                >
                  View All Products
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map((product) => (
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white border-t-2 border-black pt-16 pb-8 px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-display text-5xl font-bold tracking-tighter mb-6">UN/KNOWN</h3>
              <p className="font-mono text-sm max-w-xs text-gray-400">
                Digital brutalism for the modern consumer. 
                Based in the cloud. Accessible everywhere.
              </p>
            </div>
            <div>
              <h4 className="font-mono font-bold uppercase mb-4">Shop</h4>
              <ul className="space-y-2 font-mono text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">All Products</li>
                <li className="hover:text-white cursor-pointer">New Arrivals</li>
                <li className="hover:text-white cursor-pointer">Accessories</li>
                <li className="hover:text-white cursor-pointer">Archive</li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono font-bold uppercase mb-4">Legal</h4>
              <ul className="space-y-2 font-mono text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">Terms of Service</li>
                <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer">Returns</li>
                <li className="hover:text-white cursor-pointer">Shipping</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <p className="font-mono text-xs uppercase text-gray-500">
              © 2025 UN/KNOWN Systems. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
