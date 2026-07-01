import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { Spinner } from "../components/ui/Loaders/Spinner";

export const AuthRoute = () => {
  const { accessToken, hydrated } = useAuthStore();

  if (!hydrated) {
    return (
          <div className="min-h-screen flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        );
  }

  if (accessToken) {
    return <Navigate to="/workspace" replace />;
  }

  return <Outlet />;
};
