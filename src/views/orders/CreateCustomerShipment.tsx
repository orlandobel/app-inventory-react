import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createCustomerShipment } from "@/services/shipmentService";
import type { CustomerShipment } from "@/types/order";
import "@/styles/new-shipment.css";
import { v4 as uuidv4 } from "uuid";
import { usePreferences } from "@/context/PreferencesContextHook";

const NewShipment = () => {
  const navigate = useNavigate();
  const { theme } = usePreferences();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [items, setItems] = useState([{ productId: "", quantity: "", unitPrice: "" }]);
  const [formError, setFormError] = useState("");

  const handleItemChange = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { productId: "", quantity: "", unitPrice: "" }]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const validateInputs = (): boolean => {
    if (!customerName || !customerEmail) return false;
    if (!/\S+@\S+\.\S+/.test(customerEmail)) return false;
    for (const item of items) {
      if (
        !item.productId ||
        !/^\d+$/.test(item.quantity) ||
        !/^\d+(\.\d{1,2})?$/.test(item.unitPrice)
      ) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) {
      setFormError("Por favor llena todos los campos correctamente.");
      return;
    }

    const parsedItems = items.map((i) => ({
      productId: i.productId,
      quantity: parseInt(i.quantity, 10),
      unitPrice: parseFloat(i.unitPrice),
    }));

    const totalAmount = parsedItems.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);

    const newShipment: CustomerShipment = {
      id: uuidv4(),
      customerName,
      customerEmail,
      items: parsedItems,
      status: "preparing",
      shipmentDate: new Date(),
      totalAmount,
    };

    try {
      await createCustomerShipment(newShipment);
      navigate("/shipments"); // redirige al listado de envíos
    } catch (err) {
      setFormError(`No se pudo crear el envío: ${err}`);
    }
  };


  return (
    <div className={`new-shipment ${theme === "dark" ? "new-shipment--dark" : ""}`}>
      <h2 className="new-shipment__title">Crear nuevo envío</h2>
      <form onSubmit={handleSubmit} className="new-shipment__form">
        <div className="new-shipment__field">
          <label>Nombre del cliente:</label>
          <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
        </div>
        <div className="new-shipment__field">
          <label>Email del cliente:</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
        </div>

        <h3 className="new-shipment__section-title">Productos a enviar</h3>
        {items.map((item, index) => (
          <div className="new-shipment__product-row" key={index}>
            <input
              placeholder="ID del producto"
              value={item.productId}
              onChange={(e) => handleItemChange(index, "productId", e.target.value)}
              required
            />
            <input
              inputMode="numeric"
              pattern="[0-9]+"
              placeholder="Cantidad"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
              required
            />
            <input
              inputMode="decimal"
              pattern="^\d+(\.\d{1,2})?$"
              placeholder="Precio unitario"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
              required
            />
            {items.length > 1 && (
              <button
                type="button"
                className="product-row__btn product-row__btn--remove"
                onClick={() => removeItem(index)}
              >
                –
              </button>
            )}
          </div>
        ))}

        <div className="new-shipment__add-btn-wrapper">
          <button
            type="button"
            className="product-row__btn product-row__btn--add"
            onClick={addItem}
          >
            +
          </button>
        </div>

        {formError && <p className="new-shipment__error">{formError}</p>}

        <button type="submit" className="new-shipment__submit">
          Guardar Envío
        </button>
      </form>
    </div>
  );
};

export default NewShipment;
