import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContextHook";
import { usePreferences } from "@/context/PreferencesContextHook";
import { getSupplyOrders } from "@/services/ordersService";
import type { SupplyOrder } from "@/types/order";
import "@/styles/orders.css";
import { useNavigate } from "react-router";

const Orders: React.FC = () => {
    const { user } = useAuth();
    const { theme } = usePreferences();
    const navigate = useNavigate();

    const [orders, setOrders] = useState<SupplyOrder[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getSupplyOrders().then((data) => {
            setOrders(data);
            setIsLoading(false);
        });
    }, []);

    const handleCreateOrder = () => {
        navigate("/orders/new");
    };

    return (
        <div className={`orders ${theme === "dark" ? "orders--dark" : ""}`}>
            <h1 className="orders__title">Órdenes de Suministro</h1>
            <p className="orders__subtitle">Usuario: {user?.username}</p>

            <button className="orders__create-button" onClick={handleCreateOrder}>
                Crear nueva orden
            </button>

            {isLoading && <p className="orders__loading">Cargando órdenes…</p>}

            <ul className="orders__list">
                {orders.map((order) => (
                    <li
                        key={order.id}
                        className={`order-card ${theme === "dark" ? "order-card--dark" : ""}`}
                    >
                        <h2 className="order-card__id">Orden #{order.id}</h2>
                        <p className="order-card__status">
                            <strong>Estado:</strong> {order.status}
                        </p>
                        <p className="order-card__supplier">
                            <strong>Proveedor:</strong> {order.supplierId}
                        </p>
                        <p className="order-card__date">
                            <strong>Fecha de orden:</strong> {order.orderDate.toLocaleDateString()}
                        </p>
                        <p className="order-card__expected">
                            <strong>Entrega esperada:</strong>{" "}
                            {order.expectedDelivery?.toLocaleDateString() || "N/D"}
                        </p>
                        {order.actualDelivery && (
                            <p className="order-card__actual">
                                <strong>Entrega real:</strong> {order.actualDelivery.toLocaleDateString()}
                            </p>
                        )}
                        <p className="order-card__total">
                            <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
                        </p>
                        {order.notes && (
                            <p className="order-card__notes">
                                <strong>Notas:</strong> {order.notes}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;
