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
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilter {
  name?: string;
  category?: string;
  supplierId?: string;
  sku?: string;
  lowStock?: boolean;
}