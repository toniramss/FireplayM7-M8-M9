"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "@/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface Game {
    id: number;
    name: string;
    background_image: string;
    rating?: number;
}

interface FavoritesContextType {
    favorites: Game[];
    toggleFavorite: (game: Game) => void;
    isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
    favorites: [],
    toggleFavorite: () => { },
    isFavorite: () => false,
});

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<Game[]>([]);

    // Cargar favoritos desde Firestore
    useEffect(() => {
        const loadFavorites = async () => {
            if (!user?.uid) return;
            try {
                const ref = doc(db, "favorites", user.uid);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setFavorites(snap.data().items || []);
                }
            } catch (err) {
                console.error("Error al cargar favoritos:", err);
            }
        };
        loadFavorites();
    }, [user]);

    // Guardar favoritos en Firestore
    useEffect(() => {
        if (!user?.uid) return;
        const ref = doc(db, "favorites", user.uid);
        const safeFavorites = favorites.map(({ id, name, background_image, rating }) => ({
            id, name, background_image, rating,
        }));
        setDoc(ref, { items: safeFavorites });
    }, [favorites, user]);

    const toggleFavorite = (game: Game) => {
        const exists = favorites.find((g) => g.id === game.id);
        if (exists) {
            setFavorites(favorites.filter((g) => g.id !== game.id));
        } else {
            setFavorites([...favorites, game]);
        }
    };

    const isFavorite = (id: number) => {
        return favorites.some((g) => g.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
