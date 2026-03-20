import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path ? "text-black font-bold border-b-2 border-black" : "text-gray-600 hover:text-black";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-black tracking-tight cursor-pointer">MARKET</span>
        </Link>
        
        <div className="flex gap-8 items-center">
          <Link href="/products">
            <span className={`text-sm uppercase tracking-wider cursor-pointer transition ${isActive("/products")}`}>
              Shop
            </span>
          </Link>
          <Link href="/login">
            <span className={`text-sm uppercase tracking-wider cursor-pointer transition ${isActive("/login")}`}>
              Login
            </span>
          </Link>
          <Link href="/register">
            <span className={`text-sm uppercase tracking-wider cursor-pointer transition ${isActive("/register")}`}>
              Register
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
