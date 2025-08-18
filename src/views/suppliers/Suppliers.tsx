import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContextHook";
import { usePreferences } from "@/context/PreferencesContextHook";
import { getSuppliers } from "@/services/suppliersService";
import type { Supplier } from "@/types/suppliers";
import "@/styles/suppliers.css";

const Suppliers: React.FC = () => {
  const { user } = useAuth();
  const { theme } = usePreferences();

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getSuppliers();
        // Convert createdAt strings to Date objects
        const transformed = data.map((s) => ({
          ...s,
          createdAt: new Date(s.createdAt),
        }));
        setSuppliers(transformed);
      } catch (err) {
        console.error(err);
        setError("Error al cargar proveedores. Por favor, intenta de nuevo.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div className={`suppliers ${theme === "dark" ? "suppliers--dark" : ""}`}>
      <h1 className="suppliers__title">Proveedores</h1>
      <p className="suppliers__subtitle">Usuario: {user?.username}</p>

      {isLoading && <p className="suppliers__loading">Cargando proveedores…</p>}
      {error && <p className="suppliers__error">{error}</p>}

      {!isLoading && !error && suppliers.length === 0 && (
        <p className="suppliers__empty">No hay proveedores disponibles.</p>
      )}

      <ul className="suppliers__list">
        {suppliers.map((s) => (
          <li
            key={s.id}
            className={`supplier-card ${theme === "dark" ? "supplier-card--dark" : ""}`}
          >
            <h2 className="supplier-card__name">{s.name}</h2>
            <p className="supplier-card__contact">
              <strong>Contacto:</strong> {s.contactPerson}
            </p>
            <p className="supplier-card__email">{s.email}</p>
            <p className="supplier-card__phone">{s.phone}</p>
            <p className="supplier-card__address">
              {s.address}, {s.city}, {s.country}
            </p>
            <p className="supplier-card__created">
              Creado: {s.createdAt.toLocaleDateString("es-MX")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suppliers;
