import "./globals.css";
import { ReactNode } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <CartProvider>
          <FavoritesProvider>
            <Header />
            {children}
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}