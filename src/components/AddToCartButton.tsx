"use client";

import { useCart } from "@/context/CartContext";
//import { GameDetails } from "@/types/game-details.types";
import { Game } from "@/types/games.types";

export default function AddToCartButton({ game }: { game: Game }) {
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
