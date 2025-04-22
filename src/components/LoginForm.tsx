// components/LoginForm.tsx
"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);  // Limpiar errores anteriores

        try {
            // Iniciar sesión con Firebase Authentication
            await signInWithEmailAndPassword(auth, email, password);

            // Redirigir al usuario a la página principal (o cualquier página que prefieras)
            router.push("/");  // Esto redirige a la página principal

            // Limpiar los campos después del inicio de sesión
            setEmail("");
            setPassword("");
        } catch (err: any) {
            // Aquí puedes manejar diferentes tipos de errores que podrían ocurrir
            if (err.code === "auth/wrong-password") {
                setError("La contraseña es incorrecta. Intenta de nuevo.");
            } else if (err.code === "auth/user-not-found") {
                setError("El correo electrónico no está registrado.");
            } else {
                setError("Error al iniciar sesión. Intenta de nuevo.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">Iniciar Sesión</h2>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Iniciando..." : "Iniciar sesión"}
                </button>
            </form>

            <p className="text-center mt-4">
                ¿No tienes cuenta?{" "}
                <a href="/register" className="text-blue-500 hover:text-blue-700">
                    Regístrate aquí
                </a>
            </p>
        </div>
    );
}
