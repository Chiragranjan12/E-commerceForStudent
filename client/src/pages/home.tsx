import { useEffect, useState } from "react";
import { listingService } from "../services/listingService";

export default function Home() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const page = await listingService.getListings();
        setListings(page?.content ?? []);
      } catch (err: unknown) {
        console.error("Failed to fetch listings:", err);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-black mb-12 uppercase tracking-tight">Recent Listings</h1>

        {loading ? (
          <div className="text-gray-500 font-bold uppercase">Loading listings...</div>
        ) : listings.length === 0 ? (
          <div className="text-gray-500 font-bold uppercase">No listings available.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {listings.map((item) => (
              <div key={item.id} className="group cursor-pointer border border-gray-200 p-4 transition hover:bg-gray-50 hover:border-black">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover mb-4 bg-gray-100" />
                ) : (
                  <div className="w-full h-48 bg-gray-100 mb-4 flex items-center justify-center text-gray-400 text-sm font-bold uppercase tracking-widest">No Image</div>
                )}
                <h2 className="font-bold text-lg mb-1">{item.title}</h2>
                <p className="text-gray-600 text-sm mb-3">₹{item.price}</p>
                <button className="w-full py-2 border border-black bg-white text-black text-sm font-bold uppercase hover:bg-black hover:text-white transition">
                  View Item
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
