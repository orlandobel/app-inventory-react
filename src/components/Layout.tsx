import React from "react";
import { Outlet } from "react-router";
import Navbar from "@/components/NavBar";

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;