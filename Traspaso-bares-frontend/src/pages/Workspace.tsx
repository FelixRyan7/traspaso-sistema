import { ErrorState } from "../components/ui/Alerts/ErrorState";
import { Spinner } from "../components/ui/Loaders/Spinner";
import { useDashboard } from "../hooks/useDashboard";
import { useNavigate } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';

export default function Workspace() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useDashboard();

  if (isLoading) return <div><Spinner/></div>;

  if (error) {
      return <ErrorState error={error} />;
    }
   
  const handleLocationClick = (id: number) => {
    navigate(`/workspace/locations/${id}`);
  };
  return (
    <>
    <div className="p-6">
    <h2 className="mt-2 text-xl font-bold text-dark mb-6">Puntos de Venta en <span className="text-primary">{data?.company.name}</span></h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    {data?.locations?.map((location) => (
      <div
        key={location.id}
        onClick={() => handleLocationClick(location.id)}
        className="group p-5 rounded-xl  bg-white-soft shadow-sm hover:shadow-md transition-all cursor-pointer"
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
    </div>
    </>
  )
}
