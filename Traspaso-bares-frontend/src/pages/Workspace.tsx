import { Spinner } from "../components/ui/Loaders/Spinner";
import { useDashboard } from "../hooks/useDashboard";
import { useNavigate } from "react-router-dom";


export default function Workspace() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useDashboard();

  if (isLoading) return <div><Spinner/></div>;

  if (error) return <p>Error cargando datos</p>;
   
  const handleLocationClick = (id: number) => {
    navigate(`/workspace/locations/${id}`);
  };
  return (
    <>
    <h3 className="mt-2 text-center text-primary">Puntos de Venta en {data?.company.name}:</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    {data?.locations?.map((location) => (
      <div
        key={location.id}
        onClick={() => handleLocationClick(location.id)}
        className="group p-5 rounded-xl border border-gray-light bg-white-soft shadow-sm hover:shadow-md transition-all cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-dark font-semibold text-lg">
            {location.name}
          </h3>

          <span className={`w-2 h-2 rounded-full group-hover:scale-125 transition ${location.isActive ? 'bg-success' : 'bg-error'}`} />
        </div> 

        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs px-2 py-1 rounded-full bg-primary-soft text-primary-strong">
            {location.type}
          </span>

          <button className="text-sm text-primary hover:text-primary-strong font-medium">
            Entrar →
          </button>
        </div>
      </div>
    ))}
    </div>
    </>
  )
}
