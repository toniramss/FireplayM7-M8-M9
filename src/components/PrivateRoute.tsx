"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Si el usuario no está autenticado y ya no estamos cargando la autenticación, redirigimos al login
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    // Si todavía estamos cargando la autenticación, no renderizamos nada
    return <div>Loading...</div>;
  }

  // Si el usuario está autenticado, renderizamos el contenido protegido
  return <>{children}</>;
};

export default PrivateRoute;
