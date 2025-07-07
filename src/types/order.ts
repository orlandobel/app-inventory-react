export type OrderStatus = 'pending' | 'ordered' | 'partial' | 'received' | 'cancelled';
export type ShipmentStatus = 'preparing' | 'shipped' | 'delivered' | 'cancelled';

export interface SupplyOrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  receivedQuantity?: number;
}

export interface CustomerShipmentItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface SupplyOrder {
  id: string;
  supplierId: string;
  items: SupplyOrderItem[];
  status: OrderStatus;
  orderDate: Date;
  expectedDelivery?: Date;
  actualDelivery?: Date;
  totalAmount: number;
  notes?: string;
}

export interface CustomerShipment {
  id: string;
  customerName: string;
  customerEmail: string;
  items: CustomerShipmentItem[];
  status: ShipmentStatus;
  shipmentDate: Date;
  trackingNumber?: string;
  totalAmount: number;
}