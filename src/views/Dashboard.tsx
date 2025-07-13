import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContextHook";
import { usePreferences } from "@/context/PreferencesContextHook";
import { getProducts } from "@/services/productsService";
import type { Product } from "@/types/product";
import "@/styles/dasboard.css";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { theme } = usePreferences();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 4;

  const loadProducts = async (reset = false) => {
    setIsLoading(true);
    const currentOffset = reset ? 0 : offset;
    const { products: newProducts, hasMore: more } = await getProducts(
      searchTerm,
      currentOffset,
      limit
    );

    setProducts(reset ? newProducts : [...products, ...newProducts]);
    setOffset(currentOffset + limit);
    setHasMore(more);
    setIsLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setOffset(0);
    loadProducts(true); // Reset lista
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className={`dashboard ${theme === "dark" ? "dashboard--dark" : ""}`}>
      <h1 className="dashboard__title">Bienvenido, {user?.username}</h1>
      <p className="dashboard__subtitle">Rol: {user?.role}</p>

      <form onSubmit={handleSearch} className="dashboard__search-form">
        <input
          type="text"
          placeholder="Buscar por nombre o SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="dashboard__search-input"
        />
        <button type="submit" className="dashboard__search-button">
          Buscar
        </button>
      </form>

      <div className="dashboard__products">
        {products.map((product) => (
          <div
            className={`product-card ${theme === "dark" ? "product-card--dark" : ""}`}
            key={product.id}
          >
            <img
              src={product.imgSource || "https://via.placeholder.com/100"}
              alt={product.name}
              className="product-card__image"
            />
            <div className="product-card__info">
              <h3 className="product-card__name">{product.name}</h3>
              <p className="product-card__sku">SKU: {product.sku}</p>
              <p className="product-card__category">{product.category}</p>
              <p className="product-card__stock">
                Stock: {product.currentStock} (min: {product.minimumStock})
              </p>
              <p className="product-card__price">
                Precio: ${product.unitPrice.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isLoading && <p className="dashboard__loading">Cargando productos...</p>}

      {!isLoading && hasMore && (
        <button className="dashboard__load-more" onClick={() => loadProducts()}>
          Mostrar más
        </button>
      )}

      {!isLoading && !hasMore && products.length > 0 && (
        <p className="dashboard__end-text">No hay más productos para mostrar.</p>
      )}
    </div>
  );
};

export default Dashboard;
