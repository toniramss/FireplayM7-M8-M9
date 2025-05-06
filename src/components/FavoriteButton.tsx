"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { Game } from "@/types/games.types";

export default function FavoriteButton({ game }: { game: Game }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(game.id);

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        toggleFavorite(game);
      }}
      className={`text-sm px-2 py-1 rounded`}
    >
      {favorite ? "❤️" : "🤍"}
    </button>
  );
  
}
