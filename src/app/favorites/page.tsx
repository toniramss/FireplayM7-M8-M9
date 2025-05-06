"use client";

import { useFavorites } from "@/context/FavoritesContext";
import GameCard from "@/components/card"; // tu tarjeta de juego

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Mis Favoritos</h1>

            {favorites.length === 0 ? (
                <p className="text-gray-500">No tienes juegos favoritos todavía.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {favorites.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            )}
        </div>
    );
}
