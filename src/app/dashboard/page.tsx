"use client";

import PrivateRoute from "@/components/PrivateRoute";

export default function Dashboard() {
    return (
        <PrivateRoute>
            <div>
                <h1>Bienvenido al Dashboard</h1>
                {/* Contenido de la página del dashboard */}
            </div>
        </PrivateRoute>
    );
}