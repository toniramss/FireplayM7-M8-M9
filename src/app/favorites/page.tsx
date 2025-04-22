"use client"; // necesario si usas Next.js App Router

import PrivateRoute from "@/components/PrivateRoute";

export default function Favorites() {
    return (
        <PrivateRoute>
            <div>
                <h1>Favoritos</h1>
                {/* Contenido de la página de favoritos */}
            </div>
        </PrivateRoute>
    );
}