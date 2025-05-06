"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, getTotal, clearCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Carrito de compra</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((game) => (
            <div
              key={game.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                {/* Usa <img> si next/image da error por dominio */}
                <Image
                  src={game.background_image}
                  alt={game.name}
                  width={100}
                  height={60}
                  className="rounded-md object-cover"
                />
                <span className="font-medium">{game.name}</span>
              </div>
              <div className="text-right space-x-4">
                <span className="text-green-600 font-semibold">{game.price} €</span>
                <button
                  onClick={() => removeFromCart(game.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-lg font-bold">Total: {getTotal()} €</p>

            <div className="mt-4 flex justify-end gap-4">
              <button
                disabled
                className="bg-gray-600 text-white px-6 py-2 rounded-md cursor-not-allowed"
              >
                Finalizar compra
              </button>
              <button
                onClick={clearCart}
                className="text-sm underline text-red-500"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
