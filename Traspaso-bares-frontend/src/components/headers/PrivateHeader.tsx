import { useAuthStore } from "../../store/auth.store";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PrivateHeader({setMobileOpen}: Props) {

  const user = useAuthStore((state) => state.user);


  return (
    <header className="
      h-20 md:h-18
      flex items-center justify-between
      px-2 
      backdrop-blur-xl
      ">

      {/* LEFT */}
      <div className="flex items-center">
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden"
        >
          <MenuIcon fontSize="large"/>
        </button>
       
        <h1 className="hidden md:flex text-lg md:ml-10 font-semibold text-dark">
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