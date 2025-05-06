"use client"; // Necesario para que este componente se ejecute en el cliente

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface GameDetails {
  id: string;
  name: string;
  description_raw: string;
  short_screenshots: { id: string; image: string }[];
  released: string;
  developers: { name: string }[];
  genres: { name: string }[];
  tags: { name: string }[];
}

const GameDetails = () => {
  const [game, setGame] = useState<GameDetails | null>(null);  // Estado para almacenar los detalles del juego
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  const { id } = useParams();  // Obtener el ID del juego desde la URL

  // Función para obtener los detalles del juego
  const fetchGameDetails = async (gameId: string) => {
    setLoading(true);
    setError(null);

    try {
      // Aquí haces la llamada a la API para obtener los detalles del juego
      const res = await fetch(`https://api.rawg.io/api/games/${gameId}`);
      const data = await res.json();
      setGame(data); // Guardamos los detalles del juego
    } catch (err) {
      setError("Hubo un error al obtener los detalles del juego.");
    }

    setLoading(false); // Terminamos el estado de carga
  };

  useEffect(() => {
    if (id) {
      fetchGameDetails(id as string); // Llamar a la función con el ID del juego
    }
  }, [id]); // Ejecutar este efecto solo cuando cambie el ID

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!game) return <p>Juego no encontrado</p>;

  return (
    <section className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Nombre del juego */}
        <h1 className="text-3xl font-bold">{game.name}</h1>

        {/* Descripción */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Descripción:</h2>
          <p className="text-lg text-gray-700">{game.description_raw}</p>
        </div>

        {/* Capturas de pantalla */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Capturas:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {game.short_screenshots?.map((screenshot: any) => (
              <Image
                key={screenshot.id}
                src={screenshot.image}
                alt="Captura"
                className="w-full h-auto rounded"
              />
            ))}
          </div>
        </div>

        {/* Requisitos */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Requisitos:</h2>
          <ul className="list-disc pl-5">
            <li><strong>SO:</strong> {game.released}</li>
            <li><strong>Desarrollador:</strong> {game.developers[0]?.name}</li>
            <li><strong>Género:</strong> {game.genres.map((genre: any) => genre.name).join(", ")}</li>
          </ul>
        </div>

        {/* Etiquetas */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Etiquetas:</h2>
          <div className="flex flex-wrap gap-2">
            {game.tags.map((tag: any, index: number) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameDetails;
