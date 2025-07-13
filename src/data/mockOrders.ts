import type { SupplyOrder, CustomerShipment } from "@/types/order";

export const mockSupplyOrders: SupplyOrder[] = [
  {
    id: 'supply-order-1',
    supplierId: 'supplier-1',
    items: [
      {
        productId: 'product-2',
        quantity: 50,
        unitPrice: 8.50,
        receivedQuantity: 50,
      },
      {
        productId: 'product-3',
        quantity: 30,
        unitPrice: 12.75,
        receivedQuantity: 30,
      },
    ],
    status: 'received',
    orderDate: new Date('2024-01-05'),
    expectedDelivery: new Date('2024-01-15'),
    actualDelivery: new Date('2024-01-14'),
    totalAmount: 807.50,
    notes: 'Order received in excellent condition',
  },
  {
    id: 'supply-order-2',
    supplierId: 'supplier-2',
    items: [
      {
        productId: 'product-4',
        quantity: 100,
        unitPrice: 4.50,
        receivedQuantity: 100,
      },
      {
        productId: 'product-5',
        quantity: 24,
        unitPrice: 3.25,
        receivedQuantity: 24,
      },
    ],
    status: 'received',
    orderDate: new Date('2023-12-20'),
    expectedDelivery: new Date('2024-01-02'),
    actualDelivery: new Date('2024-01-03'),
    totalAmount: 528.00,
  },
  {
    id: 'supply-order-3',
    supplierId: 'supplier-3',
    items: [
      {
        productId: 'product-9',
        quantity: 25,
        unitPrice: 5.50,
        receivedQuantity: 15,
      },
      {
        productId: 'product-10',
        quantity: 40,
        unitPrice: 8.25,
      },
    ],
    status: 'partial',
    orderDate: new Date('2024-01-08'),
    expectedDelivery: new Date('2024-01-18'),
    totalAmount: 467.50,
    notes: 'Partial delivery - microfiber cloths partially received',
  },
  {
    id: 'supply-order-4',
    supplierId: 'supplier-1',
    items: [
      {
        productId: 'product-15',
        quantity: 20,
        unitPrice: 15.75,
      },
      {
        productId: 'product-1',
        quantity: 15,
        unitPrice: 45.00,
      },
    ],
    status: 'ordered',
    orderDate: new Date('2024-01-12'),
    expectedDelivery: new Date('2024-01-25'),
    totalAmount: 990.00,
    notes: 'Rush order for low stock items',
  },
  {
    id: 'supply-order-5',
    supplierId: 'supplier-4',
    items: [
      {
        productId: 'product-12',
        quantity: 10,
        unitPrice: 85.00,
      },
    ],
    status: 'pending',
    orderDate: new Date('2024-01-15'),
    expectedDelivery: new Date('2024-02-01'),
    totalAmount: 850.00,
    notes: 'Waiting for supplier confirmation',
  },
  {
    id: 'supply-order-6',
    supplierId: 'supplier-2',
    items: [
      {
        productId: 'product-5',
        quantity: 36,
        unitPrice: 3.25,
      },
      {
        productId: 'product-16',
        quantity: 12,
        unitPrice: 10.50,
      },
    ],
    status: 'cancelled',
    orderDate: new Date('2023-12-15'),
    totalAmount: 243.00,
    notes: 'Cancelled due to supplier stock issues',
  },
];

export const mockCustomerShipments: CustomerShipment[] = [
  {
    id: 'shipment-1',
    customerName: 'Empresa Tecnológica del Norte',
    customerEmail: 'compras@tecnorte.com',
    items: [
      {
        productId: 'product-1',
        quantity: 5,
        unitPrice: 89.99,
      },
      {
        productId: 'product-14',
        quantity: 3,
        unitPrice: 39.99,
      },
    ],
    status: 'delivered',
    shipmentDate: new Date('2024-01-10'),
    trackingNumber: 'TN-001-2024',
    totalAmount: 569.92,
  },
  {
    id: 'shipment-2',
    customerName: 'Oficinas Corporativas SA',
    customerEmail: 'admin@oficorpsa.mx',
    items: [
      {
        productId: 'product-4',
        quantity: 20,
        unitPrice: 8.99,
      },
      {
        productId: 'product-6',
        quantity: 10,
        unitPrice: 12.99,
      },
      {
        productId: 'product-17',
        quantity: 5,
        unitPrice: 13.99,
      },
    ],
    status: 'shipped',
    shipmentDate: new Date('2024-01-12'),
    trackingNumber: 'TN-002-2024',
    totalAmount: 379.75,
  },
  {
    id: 'shipment-3',
    customerName: 'Hotel Plaza Culiacán',
    customerEmail: 'gerencia@hotelplaza.com',
    items: [
      {
        productId: 'product-8',
        quantity: 15,
        unitPrice: 4.99,
      },
      {
        productId: 'product-18',
        quantity: 12,
        unitPrice: 7.99,
      },
    ],
    status: 'preparing',
    shipmentDate: new Date('2024-01-14'),
    totalAmount: 170.73,
  },
  {
    id: 'shipment-4',
    customerName: 'Constructora del Pacífico',
    customerEmail: 'proyectos@construpac.mx',
    items: [
      {
        productId: 'product-11',
        quantity: 8,
        unitPrice: 199.99,
      },
      {
        productId: 'product-13',
        quantity: 4,
        unitPrice: 89.99,
      },
    ],
    status: 'delivered',
    shipmentDate: new Date('2024-01-08'),
    trackingNumber: 'TN-003-2024',
    totalAmount: 1959.88,
  },
  {
    id: 'shipment-5',
    customerName: 'Restaurante La Cocina',
    customerEmail: 'admin@lacocina.com',
    items: [
      {
        productId: 'product-9',
        quantity: 6,
        unitPrice: 11.99,
      },
      {
        productId: 'product-10',
        quantity: 8,
        unitPrice: 16.99,
      },
    ],
    status: 'cancelled',
    shipmentDate: new Date('2024-01-06'),
    totalAmount: 207.86,
  },
];