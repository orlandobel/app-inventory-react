// services/suppliersService.ts
import type { Supplier } from "@/types/suppliers";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const SUPPLIERS_ENDPOINT = `${API_BASE_URL}/api/suppliers`;

export const getSuppliers = async (): Promise<Supplier[]> => {
  try {
    const response = await fetch(SUPPLIERS_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Supplier[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw new Error("Failed to fetch suppliers");
  }
};
