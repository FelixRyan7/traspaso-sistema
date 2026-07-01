import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

type Props = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export default function RoleGuard({
  children,
  allowedRoles,
}: Props) {
  const user = useAuthStore((state) => state.user);

  // no user
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // no role permission
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
}