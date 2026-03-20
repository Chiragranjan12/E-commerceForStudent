import { useLocation, useSearch } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { listingService } from '../services/listingService';
import { FormEvent, useState } from 'react';

export default function Products() {
  const [location, navigate] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);

  // Read state from URL
  const page = parseInt(searchParams.get('page') || '0', 10);
  const sort = searchParams.get('sort') || 'createdAt,desc';
  const category = searchParams.get('category') || undefined;
  const keyword = searchParams.get('keyword') || undefined;
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

  // Local state for text input fields to prevent jumping on every keystroke
  const [localKeyword, setLocalKeyword] = useState(keyword || '');
  const [localMinPrice, setLocalMinPrice] = useState(minPrice?.toString() || '');
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice?.toString() || '');

  // Helper to update URL params
  const updateParams = (newParams: Record<string, string | undefined>) => {
    const current = Object.fromEntries(searchParams.entries());
    const updated = { ...current, ...newParams };

    // Remove empty strings or undefined so we keep the URL clean
    Object.keys(updated).forEach((key) => {
      if (!updated[key]) {
        delete updated[key];
      }
    });

    const newQs = new URLSearchParams(updated as Record<string, string>).toString();
    navigate(`${location}?${newQs}`);
  };

  const { data, isLoading, error } = useQuery({
    // Attach these dependencies to re-query when the URL changes
    queryKey: ['listings', { page, sort, category, keyword, minPrice, maxPrice }],
    queryFn: () =>
      listingService.getListings({
        page,
        size: 12,
        sort,
        category,
        keyword,
        minPrice,
        maxPrice,
      }),
  });

  const products = data?.content || [];
  const totalPages = data?.totalPages || 0;

  const handleCategoryClick = (newCategory?: string) => {
    updateParams({ category: newCategory, page: '0' });
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateParams({ 
      keyword: localKeyword, 
      minPrice: localMinPrice, 
      maxPrice: localMaxPrice, 
      page: '0' 
    });
  };

  const handleClearFilters = () => {
    setLocalKeyword('');
    setLocalMinPrice('');
    setLocalMaxPrice('');
    navigate(location); // Clear all URL search params
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-12">
        {/* Sidebar for Filters */}
        <div className="w-full md:w-1/4">
          <h2 className="text-xl font-black uppercase mb-6 tracking-wider">Filters</h2>
          
          <form onSubmit={handleSearchSubmit} className="mb-8 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Search</label>
              <input 
                type="text" 
                placeholder="Keywords..."
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
                value={localKeyword}
                onChange={(e) => setLocalKeyword(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Min Price</label>
                <input 
                  type="number" 
                  placeholder="0"
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
                  value={localMinPrice}
                  onChange={(e) => setLocalMinPrice(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Max Price</label>
                <input 
                  type="number" 
                  placeholder="Any"
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
                  value={localMaxPrice}
                  onChange={(e) => setLocalMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-black text-white text-sm font-bold uppercase py-2 hover:bg-gray-800 transition"
            >
              Apply Filters
            </button>
            {(keyword || minPrice || maxPrice || category) && (
              <button 
                type="button" 
                onClick={handleClearFilters}
                className="w-full text-xs font-bold uppercase text-gray-500 hover:text-black mt-2 underline transition"
              >
                Clear All
              </button>
            )}
          </form>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-3">Categories</label>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => handleCategoryClick()} 
                className={`text-left px-4 py-2 text-sm font-bold uppercase transition ${!category ? 'bg-black text-white' : 'border border-gray-300 hover:bg-gray-100'}`}>
                All
              </button>
              <button 
                onClick={() => handleCategoryClick('Furniture')} 
                className={`text-left px-4 py-2 text-sm font-bold uppercase transition ${category === 'Furniture' ? 'bg-black text-white' : 'border border-gray-300 hover:bg-gray-100'}`}>
                Furniture
              </button>
              <button 
                onClick={() => handleCategoryClick('Lighting')} 
                className={`text-left px-4 py-2 text-sm font-bold uppercase transition ${category === 'Lighting' ? 'bg-black text-white' : 'border border-gray-300 hover:bg-gray-100'}`}>
                Lighting
              </button>
              <button 
                onClick={() => handleCategoryClick('Decor')} 
                className={`text-left px-4 py-2 text-sm font-bold uppercase transition ${category === 'Decor' ? 'bg-black text-white' : 'border border-gray-300 hover:bg-gray-100'}`}>
                Decor
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-5xl font-black mb-2 uppercase tracking-tight">Shop</h1>
              <p className="text-gray-600">Curated collection of minimalist products</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Sort By</span>
              <select 
                value={sort}
                onChange={(e) => updateParams({ sort: e.target.value, page: '0' })}
                className="border border-gray-300 px-4 py-2 text-sm font-bold uppercase bg-white cursor-pointer focus:outline-none focus:border-black"
              >
                <option value="createdAt,desc">Newest</option>
                <option value="createdAt,asc">Oldest</option>
                <option value="price,asc">Price: Low to High</option>
                <option value="price,desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="text-center py-12 text-gray-500 font-bold uppercase tracking-widest">Loading products...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500 font-bold uppercase tracking-widest">Failed to load products.</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-gray-500 font-bold uppercase tracking-widest">No products found for given filters.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                {products.map((product: any) => (
                  <div key={product.id} className="group cursor-pointer">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.title} className="bg-gray-100 aspect-square mb-4 object-cover w-full group-hover:bg-gray-200 transition" />
                    ) : (
                      <div className="bg-gray-100 aspect-square mb-4 group-hover:bg-gray-200 transition flex items-center justify-center text-gray-400 text-sm font-bold uppercase tracking-widest">No Image</div>
                    )}
                    <h3 className="font-bold text-sm mb-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">${product.price}</p>
                    <button className="w-full py-2 border border-gray-300 text-sm font-bold uppercase transition group-hover:bg-black group-hover:border-black group-hover:text-white">
                      View
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8 pt-8 border-t border-gray-200">
                  <button 
                    onClick={() => updateParams({ page: Math.max(0, page - 1).toString() })}
                    disabled={page === 0}
                    className="px-6 py-2 border border-black text-sm font-bold uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-bold tracking-widest">
                    Page {page + 1} of {totalPages}
                  </span>
                  <button 
                    onClick={() => updateParams({ page: Math.min(totalPages - 1, page + 1).toString() })}
                    disabled={page >= totalPages - 1}
                    className="px-6 py-2 border border-black text-sm font-bold uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
