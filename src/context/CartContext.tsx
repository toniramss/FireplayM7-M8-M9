"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "@/firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface Game {
    id: number;
    name: string;
    background_image: string;
    price: number;
}

interface CartContextType {
    cart: Game[];
    addToCart: (game: Game) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    getTotal: () => number;
}

const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    getTotal: () => 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Game[]>([]);
    const { user } = useAuth();

    // Cargar carrito desde localStorage o Firestore
    useEffect(() => {
        const loadCart = async () => {
            if (user?.uid) {
                const ref = doc(db, "carts", user.uid);
                const docSnap = await getDoc(ref);
                if (docSnap.exists()) {
                    setCart(docSnap.data().items || []);
                }
            } else {
                const local = localStorage.getItem("cart");
                if (local) setCart(JSON.parse(local));
            }
        };

        loadCart();
    }, [user]);


    // Guardar en Firestore o localStorage
    useEffect(() => {
        const saveCart = async () => {

            if (user?.uid) {

                try {
                    const safeCart = cart.map(({ id, name, background_image, price }) => ({
                        id,
                        name,
                        background_image,
                        price,
                    }));

                    const ref = doc(db, "carts", user.uid);

                    await setDoc(ref, { items: safeCart });

                } catch (err) {
                    console.error("Error al guardar en Firestore:", err);
                }
            }
        };

        saveCart();
    }, [cart, user]);


    const addToCart = (game: Game) => {
        if (!cart.find((g) => g.id === game.id)) {
            setCart((prev) => [...prev, game]);
        }
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((g) => g.id !== id));
    };

    const clearCart = () => setCart([]);

    const getTotal = () =>
        cart.reduce((total, game) => total + (game.price || 0), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
