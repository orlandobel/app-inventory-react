export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  supplierId: string;
  currentStock: number;
  minimumStock: number;
  unitPrice: number;  // Selling price to customers
  costPrice: number;  // What we pay to suppliers
  imgSource: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductFilter = Partial<{
  name?: string;
  category?: string;
  supplierId?: string;
  sku?: string;
}>;


export interface ProductQueryResult {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface ProductQueryParams {
  searchTerm?: string;
  page?: number;
}