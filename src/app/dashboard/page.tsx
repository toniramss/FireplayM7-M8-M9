"use client";

import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";

export default function DashboardPage() {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const { cart } = useCart();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user?.email) return;

      const q = query(
        collection(db, "contactMessages"),
        where("email", "==", user.email)
      );

      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map((doc) => doc.data());
      setMessages(result);
    };

    fetchMessages();
  }, [user]);

  if (!user) return <p className="p-8">Debes iniciar sesión para ver tu panel.</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Mi cuenta</h1>

      {/* Usuario */}
      <div className="flex items-center gap-4 mb-8">
        <Image
          src="https://i.pravatar.cc/100"
          alt="Avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="text-lg font-semibold">{user.displayName || "Usuario"}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Favoritos */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">❤️ Juegos Favoritos</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">No tienes juegos favoritos.</p>
        ) : (
          <ul className="list-disc pl-5 text-gray-800">
            {favorites.map((game) => (
              <li key={game.id}>{game.name}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Carrito */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">🛒 Carrito</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío.</p>
        ) : (
          <ul className="list-disc pl-5 text-gray-800">
            {cart.map((game) => (
              <li key={game.id}>{game.name} - {game.price} €</li>
            ))}
          </ul>
        )}
      </section>

      {/* Mensajes */}
      <section>
        <h2 className="text-2xl font-bold mb-2">📩 Mensajes enviados</h2>
        {messages.length === 0 ? (
          <p className="text-gray-500">No has enviado mensajes.</p>
        ) : (
          <ul className="space-y-2">
            {messages.map((msg, index) => (
              <li key={index} className="border p-3 rounded bg-gray-100">
                <p className="font-semibold">{msg.name}</p>
                <p className="text-sm text-gray-700">{msg.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
