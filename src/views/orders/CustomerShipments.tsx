// src/pages/CustomerShipments.tsx
import React, { useEffect, useState } from "react";
import { getCustomerShipments } from "@/services/shipmentService";
import type { CustomerShipment } from "@/types/order";
import { usePreferences } from "@/context/PreferencesContextHook";
import { Link } from "react-router";
import "@/styles/shipments.css";

const CustomerShipments: React.FC = () => {
  const { theme } = usePreferences();
  const [shipments, setShipments] = useState<CustomerShipment[]>([]);

  useEffect(() => {
    const fetchShipments = async () => {
      const data = await getCustomerShipments();
      setShipments(data);
    };
    fetchShipments();
  }, []);

  return (
    <div className={`shipments ${theme === "dark" ? "shipments--dark" : ""}`}>
      <div className="shipments__header">
        <h1>Pedidos para clientes</h1>
        <Link to="/shipments/new" className="shipments__new-button">+ Nuevo envío</Link>
      </div>

      {shipments.map((shipment) => (
        <div className="shipment-card" key={shipment.id}>
          <div className="shipment-card__header">
            <h3>{shipment.customerName}</h3>
            <span className={`shipment-card__status shipment-card__status--${shipment.status}`}>
              {shipment.status.toUpperCase()}
            </span>
          </div>
          <p><strong>Email:</strong> {shipment.customerEmail}</p>
          <p><strong>Fecha de envío:</strong> {shipment.shipmentDate.toLocaleDateString()}</p>
          {shipment.trackingNumber && <p><strong>Tracking:</strong> {shipment.trackingNumber}</p>}
          <p><strong>Total:</strong> ${shipment.totalAmount.toFixed(2)}</p>

          <ul className="shipment-card__items">
            {shipment.items.map((item, idx) => (
              <li key={idx}>
                Producto: {item.productId} | Cantidad: {item.quantity} | Precio: ${item.unitPrice}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CustomerShipments;
