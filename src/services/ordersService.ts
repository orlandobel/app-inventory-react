import type { SupplyOrder } from "@/types/order";

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const SUPPLY_ORDERS_ENDPOINT = `${API_BASE_URL}/api/supply-orders`;

// Helper function to transform Java LocalDateTime to JavaScript Date
const transformSupplyOrder = (order: SupplyOrder) => {
  return {
    ...order,
    orderDate: new Date(order.orderDate),
    expectedDelivery: order.expectedDelivery ? new Date(order.expectedDelivery) : undefined,
    actualDelivery: order.actualDelivery ? new Date(order.actualDelivery) : undefined,
    totalAmount: parseFloat(order.totalAmount.toString())
  };
};

// Helper function to transform JavaScript Date to Java LocalDateTime format
const transformSupplyOrderForAPI = (order: SupplyOrder) => {
  return {
    ...order,
    orderDate: order.orderDate.toISOString(),
    expectedDelivery: order.expectedDelivery?.toISOString() || null,
    actualDelivery: order.actualDelivery?.toISOString() || null,
    totalAmount: order.totalAmount
  };
};

export const getSupplyOrders = async (): Promise<SupplyOrder[]> => {
  try {
    const response = await fetch(SUPPLY_ORDERS_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.map(transformSupplyOrder);
  } catch (error) {
    console.error('Error fetching supply orders:', error);
    throw new Error('Failed to fetch supply orders');
  }
};

export const createSupplyOrder = async (newOrder: SupplyOrder): Promise<SupplyOrder> => {
  try {
    const transformedOrder = transformSupplyOrderForAPI(newOrder);
    
    const response = await fetch(SUPPLY_ORDERS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transformedOrder), // enviamos DTO-like
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return transformSupplyOrder(data);
  } catch (error) {
    console.error('Error creating supply order:', error);
    throw new Error('Failed to create supply order');
  }
};
