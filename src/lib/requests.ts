//import axios from 'axios';

//const API_URL = process.env.NEXT_PUBLIC_RAWG_API_URL;
//const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export async function getSearchedGames(query: string) {

    const apiKey = process.env.NEXT_PUBLIC_RAWG_KEY;

    try {
        const res = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${query}&page_size=12`);

        if (!res.ok) {
            throw new Error("No se pudieron cargar los juegos.");
        }

        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error("Error al buscar juegos:", error);
        return [];  // Retornamos un arreglo vacío en caso de error
    }
}

export async function getGameDetails(slug: string) {

    const apiKey = process.env.NEXT_PUBLIC_RAWG_KEY;
    const res = await fetch(`https://api.rawg.io/api/games/${slug}?key=${apiKey}`);
    
    if (!res.ok) {
        throw new Error("No se pudieron obtener los detalles del juego.");
    }
    
    const data = await res.json();
    return data;
}