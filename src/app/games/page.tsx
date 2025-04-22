"use client"; // Necesario para que este componente se ejecute en el cliente

import { useState, useEffect } from "react";
import { getSearchedGames } from "../../lib/requests"; // Función que creaste
import GameCard from "../../components/card";
import { Game } from "../../types/games.types";

export default function Games() {
    const [games, setGames] = useState<Game[]>([]); // Estado para los juegos
    const [searchQuery, setSearchQuery] = useState<string>(""); // No se especifica un valor inicial
    const [loading, setLoading] = useState<boolean>(false); // Estado para la carga
    const [error, setError] = useState<string | null>(null); // Estado para el error

    // Estado para ordenar
    const [sortOrder, setSortOrder] = useState<string>("asc"); // 'asc' para ascendente, 'desc' para descendente
    const [sortBy, setSortBy] = useState<string>("rating"); // 'rating', 'date', 'alphabet'

    // Efecto para obtener juegos cuando se carga la página
    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            setError(null); // Limpiar el error antes de intentar cargar los juegos

            try {
                const result = await getSearchedGames(searchQuery); // Buscar todos los juegos sin especificar término

                // Ordenar los juegos según el criterio seleccionado
                let sortedGames = result;

                if (sortBy === "rating") {
                    sortedGames = sortedGames.sort((a, b) =>
                        sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
                    );
                } else if (sortBy === "date") {
                    sortedGames = sortedGames.sort((a, b) =>
                        sortOrder === "asc"
                            ? new Date(a.released).getTime() - new Date(b.released).getTime()
                            : new Date(b.released).getTime() - new Date(a.released).getTime()
                    );
                } else if (sortBy === "alphabet") {
                    sortedGames = sortedGames.sort((a, b) =>
                        sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
                    );
                }

                setGames(sortedGames); // Actualizar los juegos encontrados
            } catch (error) {
                setError("Hubo un error al obtener los juegos.");
            }

            setLoading(false); // Terminar el estado de carga
        };

        fetchGames(); // Llamar a la API al cargar la página
    }, [searchQuery, sortOrder, sortBy]); // Este efecto se ejecutará cuando cambien los filtros

    // Manejar el cambio en el campo de búsqueda
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Manejar el cambio en el filtro de orden
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const [sortByValue, orderValue] = value.split("-"); // Ejemplo: "rating-asc" o "date-desc"
        setSortBy(sortByValue);
        setSortOrder(orderValue);
    };

    // Manejar el envío del formulario de búsqueda (al hacer clic en el botón)
    const handleSearchSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita la recarga de la página
        setLoading(true);
        setError(null); // Limpiar el error antes de intentar cargar los juegos

        try {
            const result = await getSearchedGames(searchQuery); // Llamada a la API con el término de búsqueda

            // Ordenar los juegos según el criterio seleccionado
            let sortedGames = result;

            if (sortBy === "rating") {
                sortedGames = sortedGames.sort((a, b) =>
                    sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
                );
            } else if (sortBy === "date") {
                sortedGames = sortedGames.sort((a, b) =>
                    sortOrder === "asc"
                        ? new Date(a.released).getTime() - new Date(b.released).getTime()
                        : new Date(b.released).getTime() - new Date(a.released).getTime()
                );
            } else if (sortBy === "alphabet") {
                sortedGames = sortedGames.sort((a, b) =>
                    sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
                );
            }

            setGames(sortedGames); // Actualizar los juegos encontrados
        } catch (error) {
            setError("Hubo un error al obtener los juegos.");
        }

        setLoading(false); // Terminar el estado de carga
    };

    return (
        <section className="p-8">
            {/* Formulario de búsqueda */}
            <form onSubmit={handleSearchSubmit} className="mb-6 flex justify-center gap-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-2 rounded border border-gray-300"
                    placeholder="Buscar juegos..."
                />
                <button
                    type="submit"
                    className="ml-2 p-2 bg-blue-500 text-white rounded"
                >
                    Buscar
                </button>
            </form>

            {/* Filtro de orden */}
            <div className="flex justify-center mb-6">
                <select
                    onChange={handleSortChange}
                    className="p-2 border rounded"
                >
                    <option value="rating-asc">Ordenar por Rating (Ascendente)</option>
                    <option value="rating-desc">Ordenar por Rating (Descendente)</option>
                    <option value="date-asc">Ordenar por Fecha (Ascendente)</option>
                    <option value="date-desc">Ordenar por Fecha (Descendente)</option>
                    <option value="alphabet-asc">Ordenar Alfabéticamente (A-Z)</option>
                    <option value="alphabet-desc">Ordenar Alfabéticamente (Z-A)</option>
                </select>
            </div>

            {/* Mensajes de error o carga */}
            {loading && <p>Cargando juegos...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Mostrar juegos */}
            {games.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {games.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            ) : (
                !loading && <p>No se encontraron juegos para "{searchQuery}"</p>
            )}
        </section>
    );
}
