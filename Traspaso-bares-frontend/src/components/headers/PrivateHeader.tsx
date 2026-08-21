import { useAuthStore } from "../../store/auth.store";
import MenuIcon from "@mui/icons-material/Menu";
import type { User } from "../../types/user";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


export default function PrivateHeader({ setMobileOpen }: Props) {
  const user = useAuthStore((state) => state.user);

  return (
    <header
      className="
        h-20 md:h-18
        flex items-center justify-between mx-5
        px-2
        backdrop-blur-xl
      "
    >
      {/* LEFT */}
      <div className="flex items-center">
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden"
        >
          <MenuIcon fontSize="large" />
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center text-gray-dark mr-5">
        <AccountCircleOutlinedIcon
          sx={{ fontSize: 40 }}
        />
      </div>
    </header>
  );
}