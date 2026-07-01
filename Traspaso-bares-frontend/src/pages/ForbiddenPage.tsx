import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Buttons/Button";

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold text-error mb-4">
        403
      </h1>

      <h2 className="text-2xl font-semibold mb-2">
        Acceso denegado
      </h2>

      <p className="text-gray text-center max-w-md mb-6">
        No tienes permisos para acceder a esta sección.
      </p>

      <Button
        onClick={() => navigate("/workspace")}
        className="px-5 py-3 rounded-lg bg-primary text-white"
      >
        Volver al dashboard
      </Button>
    </div>
  );
}