import type { Supplier } from "@/types/suppliers";
import { mockSuppliers } from "@/data/mockSuppiers";

export const getSuppliers = async (): Promise<Supplier[]> => {
  // Simula llamada a backend con delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockSuppliers]);
    }, 300);
  });
};
