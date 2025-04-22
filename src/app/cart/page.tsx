"use client"; // necesario si usas Next.js App Router

import PrivateRoute from "@/components/PrivateRoute";

export default function Cart() {
    return (
        <PrivateRoute>
            <div>
                <h1>Carrito</h1>
                {/* Contenido de la página del carrito */}
            </div>
        </PrivateRoute>
    );
}