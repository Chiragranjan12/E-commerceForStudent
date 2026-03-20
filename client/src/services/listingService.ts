import api from "./api";

export type ListingsPage<T> = {
  content: T[];
  totalPages: number;
};

type Listing = {
  id: number;
  title: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category?: string;
  createdAt?: string;
};

// API functions for listings
export const listingService = {
  // Fetch all listings
  getListings: async (params?: {
    page?: number;
    size?: number;
    sort?: string;
    keyword?: string;
    minPrice?: number;
    maxPrice?: number;
    category?: string;
  }): Promise<ListingsPage<Listing>> => {
    const response = await api.get<ListingsPage<Listing>>("/listings", { params });
    return response.data;
  },

  // Get a single listing by ID
  getListingById: async (id: string) => {
    const response = await api.get<Listing>(`/listings/${id}`);
    return response.data;
  },

  // Create a new listing
  createListing: async (
    title: string,
    description: string,
    price: number,
    imageUrl: string,
  ): Promise<Listing> => {
    const response = await api.post<Listing>("/listings", { title, description, price, imageUrl });
    return response.data;
  },

  // Delete a listing
  deleteListing: async (id: string): Promise<void> => {
    await api.delete<void>(`/listings/${id}`);
  },
};
