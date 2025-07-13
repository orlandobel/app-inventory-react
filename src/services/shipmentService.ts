import type { CustomerShipment } from "@/types/order";
import { mockCustomerShipments } from "@/data/mockOrders";

const localShipments: CustomerShipment[] = [];

export const getCustomerShipments = async (): Promise<CustomerShipment[]> => {
  // Devuelve los mocks y los nuevos agregados
  return [...localShipments, ...mockCustomerShipments];
};

export const createCustomerShipment = async (newShipment: CustomerShipment): Promise<void> => {
  localShipments.unshift(newShipment);
};
