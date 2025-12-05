import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
  isNew?: boolean;
}

export function ProductCard({ id, title, price, image, category, isNew }: ProductCardProps) {
  return (
    <div 
      data-testid={`card-product-${id}`}
      className="group relative flex flex-col border-2 border-black bg-white transition-transform hover:-translate-y-1 hover:brutal-shadow duration-200"
    >
      {isNew && (
        <div className="absolute top-0 left-0 z-10 bg-accent text-white px-3 py-1 font-mono text-xs font-bold border-r-2 border-b-2 border-black">
          NEW ARRIVAL
        </div>
      )}

      <div className="relative aspect-square overflow-hidden border-b-2 border-black bg-gray-100">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        
        <div className="absolute inset-0 bg-black/0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
          <span className="font-display text-6xl text-stroke-white font-bold tracking-tighter">VIEW</span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex justify-between items-start">
          <div>
            <p 
              data-testid={`text-category-${id}`}
              className="font-mono text-xs text-muted-foreground uppercase mb-1"
            >
              {category}
            </p>
            <h3 
              data-testid={`text-title-${id}`}
              className="font-display text-2xl font-bold leading-none tracking-tight uppercase"
            >
              {title}
            </h3>
          </div>
          <span 
            data-testid={`text-price-${id}`}
            className="font-mono text-lg font-bold"
          >
            {price}
          </span>
        </div>
      </div>

      <Button 
        data-testid={`button-add-cart-${id}`}
        className="w-full rounded-none border-t-2 border-black bg-white text-black hover:bg-black hover:text-white h-12 font-mono text-sm uppercase tracking-widest transition-colors"
      >
        Add to Cart
      </Button>
    </div>
  );
}
