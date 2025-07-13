import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createSupplyOrder } from "@/services/ordersService";
import { v4 as uuidv4 } from "uuid";
import type { SupplyOrder } from "@/types/order";
import "@/styles/create-order.css";
import { usePreferences } from "@/context/PreferencesContextHook";
import { getSuppliers } from "@/services/suppliersService";
import type { Supplier } from "@/types/suppliers";

const CreateOrder = () => {
  const { theme } = usePreferences();
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [supplierId, setSupplierId] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState([{ productId: "", quantity: "", unitPrice: "" }]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const data = await getSuppliers();
      setSuppliers(data);
    };
    fetchSuppliers();
  }, []);

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { productId: "", quantity: "", unitPrice: "" }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    }
  };

  const validateNumber = (value: string) => /^[1-9]\d*$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.every(i => validateNumber(i.quantity) && validateNumber(i.unitPrice))) return;

    const parsedItems = items.map(i => ({
      productId: i.productId,
      quantity: parseInt(i.quantity),
      unitPrice: parseFloat(i.unitPrice),
    }));

    const totalAmount = parsedItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    const newOrder: SupplyOrder = {
      id: `order-${uuidv4()}`,
      supplierId,
      items: parsedItems,
      status: "ordered",
      orderDate: new Date(),
      expectedDelivery: undefined,
      totalAmount,
      notes,
    };

    await createSupplyOrder(newOrder);
    navigate("/orders");
  };
  return (
    <div className={`create-order ${theme === "dark" ? "create-order--dark" : ""}`}>
      <h1 className="create-order__title">Crear nueva orden</h1>

      <form onSubmit={handleSubmit} className="create-order__form">
        <div className="create-order__card">
          <label>
            Proveedor:
            <select
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              required
            >
              <option value="">Seleccione un proveedor</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Notas:
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
        </div>

        <div className="create-order__items">
          <h2>Productos:</h2>
          {items.map((item, idx) => (
            <div key={idx} className="create-order__item-row">
              <label>
                ID del Producto:
                <input
                  type="text"
                  value={item.productId}
                  onChange={(e) => handleItemChange(idx, "productId", e.target.value)}
                  required
                />
              </label>

              <label>
                Cantidad:
                <input
                  type="text"
                  value={item.quantity}
                  onChange={(e) => {
                    if (e.target.value === "" || validateNumber(e.target.value)) {
                      handleItemChange(idx, "quantity", e.target.value);
                    }
                  }}
                  required
                />
              </label>

              <label>
                Precio Unitario:
                <input
                  type="text"
                  value={item.unitPrice}
                  onChange={(e) => {
                    if (e.target.value === "" || validateNumber(e.target.value)) {
                      handleItemChange(idx, "unitPrice", e.target.value);
                    }
                  }}
                  required
                />
              </label>

              {items.length > 1 && (
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeItem(idx)}
                  title="Eliminar producto"
                >
                  &minus;
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="btn-add"
            onClick={addItem}
            title="Agregar producto"
          >
            +
          </button>
        </div>

        <button type="submit" className="create-order__submit">
          Guardar orden
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
