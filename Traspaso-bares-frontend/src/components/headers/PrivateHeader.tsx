import { useAuthStore } from "../../store/auth.store";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PrivateHeader({setMobileOpen}: Props) {

  const user = useAuthStore((state) => state.user);


  return (
    <header className="sticky top-0 z-40
      h-20 md:h-14
      flex items-center justify-between
      px-2
      bg-white-soft
      backdrop-blur-xl
      mx-3
      shadow-sm">

      {/* LEFT */}
      <div className="flex items-center">
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden"
        >
          <MenuIcon fontSize="large"/>
        </button>
       
        <h1 className="hidden md:flex text-lg font-semibold text-dark">
          Hola {user?.name}!
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 mr-2">

        {/* user */}
        <h1 className="md:hidden flex text-lg font-semibold text-dark">
          Hola {user?.name}!
        </h1>
        
      </div>
    </header>
  );
}