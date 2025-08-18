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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getSupplyOrders();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Error al cargar las órdenes. Por favor, intenta de nuevo.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleCreateOrder = () => {
        navigate("/orders/new");
    };

    const handleRetry = () => {
        setError(null);
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const data = await getSupplyOrders();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Error al cargar las órdenes. Por favor, intenta de nuevo.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(amount);
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'PENDING': return '#fbbf24'; // amber
            case 'ORDERED': return '#3b82f6'; // blue
            case 'PARTIAL': return '#f59e0b'; // orange
            case 'RECEIVED': return '#10b981'; // green
            case 'CANCELLED': return '#ef4444'; // red
            default: return '#6b7280'; // gray
        }
    };

    const getStatusText = (status: string): string => {
        switch (status) {
            case 'PENDING': return 'Pendiente';
            case 'ORDERED': return 'Ordenado';
            case 'PARTIAL': return 'Parcial';
            case 'RECEIVED': return 'Recibido';
            case 'CANCELLED': return 'Cancelado';
            default: return status;
        }
    };

    return (
        <div className={`orders ${theme === "dark" ? "orders--dark" : ""}`}>
            <h1 className="orders__title">Órdenes de Suministro</h1>
            <p className="orders__subtitle">Usuario: {user?.username}</p>

            <button className="orders__create-button" onClick={handleCreateOrder}>
                Crear nueva orden
            </button>

            {isLoading && (
                <div className="orders__loading">
                    <p>Cargando órdenes…</p>
                </div>
            )}

            {error && (
                <div className="orders__error">
                    <p>{error}</p>
                    <button onClick={handleRetry} className="orders__retry-button">
                        Reintentar
                    </button>
                </div>
            )}

            {!isLoading && !error && orders.length === 0 && (
                <div className="orders__empty">
                    <p>No hay órdenes de suministro disponibles.</p>
                </div>
            )}

            {!isLoading && !error && orders.length > 0 && (
                <ul className="orders__list">
                    {orders.map((order) => (
                        <li
                            key={order.id}
                            className={`order-card ${theme === "dark" ? "order-card--dark" : ""}`}
                        >
                            <div className="order-card__header">
                                <h2 className="order-card__id">Orden #{order.id}</h2>
                                <span 
                                    className="order-card__status-badge"
                                    style={{ backgroundColor: getStatusColor(order.status) }}
                                >
                                    {getStatusText(order.status)}
                                </span>
                            </div>
                            
                            <div className="order-card__details">
                                <p className="order-card__supplier">
                                    <strong>Proveedor:</strong> {order.supplierId}
                                </p>
                                <p className="order-card__date">
                                    <strong>Fecha de orden:</strong>{" "}
                                    {order.orderDate.toLocaleDateString('es-MX')}
                                </p>
                                <p className="order-card__expected">
                                    <strong>Entrega esperada:</strong>{" "}
                                    {order.expectedDelivery?.toLocaleDateString('es-MX') || "N/D"}
                                </p>
                                {order.actualDelivery && (
                                    <p className="order-card__actual">
                                        <strong>Entrega real:</strong>{" "}
                                        {order.actualDelivery.toLocaleDateString('es-MX')}
                                    </p>
                                )}
                                <p className="order-card__total">
                                    <strong>Total:</strong> {formatCurrency(order.totalAmount)}
                                </p>
                                {order.notes && (
                                    <p className="order-card__notes">
                                        <strong>Notas:</strong> {order.notes}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Orders;