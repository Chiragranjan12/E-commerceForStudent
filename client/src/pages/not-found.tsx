import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="pt-24 min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-black mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4 uppercase">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn'"'"'t exist or has been moved.
        </p>
        <Link href="/">
          <button className="px-8 py-3 bg-black text-white font-bold uppercase text-sm hover:bg-gray-900 transition">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}