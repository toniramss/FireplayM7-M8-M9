"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación
    if (!name || !email || !message) {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    // Mostrar modal
    setError("");
    setSuccess(true);

    // Limpiar campos
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Formulario de Contacto</h2>

      {/* Modal de éxito */}
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-green-700 mb-2">¡Mensaje enviado!</h2>
            <p className="text-gray-700 mb-4">Nos pondremos en contacto contigo pronto.</p>
            <button
              onClick={() => setSuccess(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-200 p-4 rounded mb-4 text-red-800">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Tu correo electrónico"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Mensaje
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Escribe tu mensaje"
            rows={4}
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
          >
            Enviar Mensaje
          </button>
        </div>
      </form>
    </div>
  );
}
