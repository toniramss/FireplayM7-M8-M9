"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation"; // para redirigir al login

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Función para hacer logout y redirigir
  const handleLogout = async () => {
    await logout(); // Cerrar sesión
    router.push("/login"); // Redirigir a la página de login
  };

  return (
    <header className="bg-[var(--color-primary)] text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-wide">
          Fireplay
        </Link>

        <nav className="space-x-4 flex items-center">
          <Link href="/favorites" className="hover:underline">
            Favoritos
          </Link>
          <Link href="/cart" className="hover:underline">
            Carrito
          </Link>

          {user ? (
            <>
              <span className="text-sm">Hola, {user.displayName || user.email}</span>
              <button
                onClick={handleLogout} // Aquí hacemos logout y redirigimos
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
