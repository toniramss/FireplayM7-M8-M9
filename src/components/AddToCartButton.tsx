"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ game }: { game: any }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const isInCart = cart.some((g) => g.id === game.id);

  return isInCart ? (
    <button
      className="p-3 px-6 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
      onClick={() => removeFromCart(game.id)}
    >
      Quitar de la cesta
    </button>
  ) : (
    <button
      className="p-3 px-6 rounded-xl bg-black text-white hover:bg-gray-800 transition"
      onClick={() => addToCart(game)}
    >
      Añadir a la cesta
    </button>
  );
}
