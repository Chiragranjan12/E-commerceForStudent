import { Link } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b-2 border-black">
      {/* Marquee Ticker */}
      <div className="bg-black text-white overflow-hidden py-1 border-b-2 border-black">
        <div className="marquee-container flex">
          <div className="marquee-content animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-widest">
            Worldwide Shipping • No Refunds • All Sales Final • Raw Artifacts Only • Limited Edition Drops • 
            Worldwide Shipping • No Refunds • All Sales Final • Raw Artifacts Only • Limited Edition Drops • 
            Worldwide Shipping • No Refunds • All Sales Final • Raw Artifacts Only • Limited Edition Drops •
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu Trigger */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-none hover:bg-accent hover:text-accent-foreground">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] border-r-2 border-black p-0 bg-background">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b-2 border-black">
                <span className="font-display text-4xl font-bold tracking-tighter">UN/KNOWN</span>
              </div>
              <nav className="flex-1 flex flex-col p-6 gap-6 font-mono text-xl uppercase">
                <Link href="/" className="hover:text-accent hover:underline decoration-2 underline-offset-4">Shop</Link>
                <Link href="/collections" className="hover:text-accent hover:underline decoration-2 underline-offset-4">Collections</Link>
                <Link href="/about" className="hover:text-accent hover:underline decoration-2 underline-offset-4">About</Link>
                <Link href="/archive" className="hover:text-accent hover:underline decoration-2 underline-offset-4">Archive</Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/">
          <span className="font-display text-5xl font-bold tracking-tighter hover:text-accent transition-colors select-none cursor-pointer">
            UN/KNOWN
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest">
          <Link href="/">
            <span className="hover:bg-black hover:text-white px-2 py-1 transition-colors cursor-pointer">Shop</span>
          </Link>
          <Link href="/collections">
            <span className="hover:bg-black hover:text-white px-2 py-1 transition-colors cursor-pointer">Collections</span>
          </Link>
          <Link href="/about">
            <span className="hover:bg-black hover:text-white px-2 py-1 transition-colors cursor-pointer">About</span>
          </Link>
        </nav>

        {/* Cart */}
        <Button variant="outline" className="rounded-none border-2 border-black hover:bg-accent hover:text-white hover:border-accent font-mono uppercase flex gap-2 items-center">
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Cart (0)</span>
        </Button>
      </div>
    </header>
  );
}
