import type { CustomerShipment } from "@/types/order";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const SHIPMENTS_ENDPOINT = `${API_BASE_URL}/api/shipments`;

// Transformación de fechas y números para JS
const transformShipment = (shipment: CustomerShipment): CustomerShipment => ({
  ...shipment,
  shipmentDate: new Date(shipment.shipmentDate),
  items: shipment.items.map(item => ({
    ...item,
    unitPrice: Number(item.unitPrice),
  })),
  totalAmount: Number(shipment.totalAmount),
});

export const getCustomerShipments = async (): Promise<CustomerShipment[]> => {
  try {
    const response = await fetch(SHIPMENTS_ENDPOINT, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data: CustomerShipment[] = await response.json();
    return data.map(transformShipment);
  } catch (error) {
    console.error("Error fetching customer shipments:", error);
    throw new Error("Failed to fetch customer shipments");
  }
};

export const createCustomerShipment = async (newShipment: CustomerShipment): Promise<void> => {
  try {
    const response = await fetch(SHIPMENTS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newShipment,
        shipmentDate: newShipment.shipmentDate.toISOString(),
        totalAmount: newShipment.totalAmount,
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    console.error("Error creating customer shipment:", error);
    throw new Error("Failed to create customer shipment");
  }
};

