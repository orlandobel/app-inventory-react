import type { Product, ProductSearchFilters } from "@/types/product";

const DEFAULT_LIMIT = 6;
const API_URL = "http://localhost:8080/api/products";

export const getProducts = async (
  offset = 0,
  limit = DEFAULT_LIMIT
): Promise<{ products: Product[]; hasMore: boolean }> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data: Product[] = await response.json();

    // Apply pagination
    const products = data.slice(offset, offset + limit);
    const hasMore = offset + limit < data.length;

    return { products, hasMore };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], hasMore: false };
  }
};

export const searchProducts = async (
  filters: ProductSearchFilters,
  offset = 0,
  limit = DEFAULT_LIMIT
): Promise<{ products: Product[]; hasMore: boolean }> => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    
    if (filters.name) params.append('name', filters.name);
    if (filters.category) params.append('category', filters.category);
    if (filters.supplierId) params.append('supplierId', filters.supplierId);
    if (filters.sku) params.append('sku', filters.sku);


    const url = `${API_URL}/search${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to search products: ${response.statusText}`);
    }

    const data: Product[] = await response.json();

    // Apply pagination to search results
    const products = data.slice(offset, offset + limit);
    const hasMore = offset + limit < data.length;

    return { products, hasMore };
  } catch (error) {
    console.error("Error searching products:", error);
    return { products: [], hasMore: false };
  }
};