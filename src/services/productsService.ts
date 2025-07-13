import type { Product } from "@/types/product";
import { mockProducts } from "@/data/mockProducts";

const DEFAULT_LIMIT = 6;

export const getProducts = async (
  searchTerm = "",
  offset = 0,
  limit = DEFAULT_LIMIT
): Promise<{ products: Product[]; hasMore: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const products = filtered.slice(offset, offset + limit);
      const hasMore = offset + limit < filtered.length;

      resolve({ products, hasMore });
    }, 300);
  });
};
