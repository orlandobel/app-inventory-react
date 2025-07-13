import React from 'react';
import { NavLink } from 'react-router';
import { useAuth } from '@/context/AuthContextHook';
import { usePreferences } from '@/context/PreferencesContextHook';
import '@/styles/navbar.css';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = usePreferences();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/orders', label: 'Órdenes', icon: '📦' },
    { path: '/shipments', label: 'Envíos', icon: '🚚' },
    { path: '/suppliers', label: 'Proveedores', icon: '🏢' },
  ];

  return (
    <nav className={`navbar ${theme === 'dark' ? 'navbar--dark' : ''}`}>
      <div className="navbar__container">
        {/* Logo/Brand */}
        <div className="navbar__brand">
          <span className="navbar__logo">📊</span>
          <span className="navbar__title">InventoryApp</span>
        </div>

        {/* Navigation Links */}
        <div className="navbar__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              end={item.path === '/'}
            >
              <span className="navbar__icon">{item.icon}</span>
              <span className="navbar__label">{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* User Actions */}
        <div className="navbar__actions">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="navbar__theme-toggle"
            title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* User Info */}
          <div className="navbar__user">
            <span className="navbar__username">{user?.username}</span>
            <span className="navbar__role">({user?.role})</span>
          </div>

          {/* Logout Button */}
          <button 
            onClick={logout}
            className="navbar__logout"
            title="Cerrar sesión"
          >
            Cerrar sesión🚪
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;