import type { SupplyOrder } from "@/types/order";
import { mockSupplyOrders } from "@/data/mockOrders";

const localOrders: SupplyOrder[] = []; // Vive solo mientras la pestaña esté abierta

export const getSupplyOrders = async (): Promise<SupplyOrder[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockSupplyOrders, ...localOrders]);
    }, 300);
  });
};

export const createSupplyOrder = async (newOrder: SupplyOrder): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localOrders.push({ ...newOrder });
      resolve();
    }, 200);
  });
};
