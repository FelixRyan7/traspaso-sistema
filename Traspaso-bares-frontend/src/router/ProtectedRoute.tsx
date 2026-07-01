// routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { Spinner } from "../components/ui/Loaders/Spinner";

export const ProtectedRoute = () => {
  const { accessToken, hydrated } = useAuthStore();

  // aún no sabemos si hay sesión o no
  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  //  no autenticado
  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  // ✔ autenticado
  return <Outlet />;
};
