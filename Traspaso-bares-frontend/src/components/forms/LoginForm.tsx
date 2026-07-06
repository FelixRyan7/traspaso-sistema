import { useForm } from "react-hook-form";
import InputFloatingRHF from "../ui/Inputs/FloatingInput";
import { Button } from "../ui/Buttons/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/login.schema";
import type { LoginFormData } from "../../schemas/login.schema";
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useLogin } from "../../hooks/useLogin";
import { useState } from "react";
import { AlertList } from "../ui/Alerts/AlertList";
import type { AlertMessage } from "../ui/Alerts/AlertList";
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Spinner } from "../ui/Loaders/Spinner";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { getApiError } from "../../api/apiError";


export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const setAuth = useAuthStore((state) => state.setAuth);
  const { mutate, isPending, isSuccess} = useLogin();
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState<AlertMessage[]>([]);
  const addAlert = (alert: AlertMessage) => {
    setAlerts((prev) => {
    const exists = prev.some(
      (a) =>
        a.type === alert.type &&
        a.content === alert.content
    );

    if (exists) return prev;

    return [...prev, alert];
  });
  };
  const removeAlert = (id: number | string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const onSubmit = (formData: LoginFormData) => {
  mutate(formData, {
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      setAlerts([]);
      setTimeout(() => {
        navigate("/workspace");
      }, 1000);
    },
    onError: (error) => {
       const apiError = getApiError(error);
       if ((error as any).isHandled) return;
      addAlert({
        id: Date.now(),
        type: "error",
        icon: <ErrorOutlineOutlinedIcon/>,
        content: apiError.message || "Error login",
      });
    },
  });
};

  return (
    <div className="flex justify-center items-center min-h-screen"> 
     
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 rounded-xl"
      >
        <div className="min-h-[80px]">
        <AlertList
          messages={alerts}
          onClose={removeAlert}
        /> 
        </div>
        
        <h1 className="font-bold text-center mb-1">Iniciar Sesión</h1>
        <h3 className="text-base text-gray/70 mb-6 font-semibold text-center">
          Accede a Traspaso
        </h3>

        {/* Email */}
        <InputFloatingRHF
          id="username"
          label="Tu Username"
          type="text"
          register={register("username")}
          error={errors.username?.message}
          value={watch("username")}
          icon={<PersonOutlinedIcon  />}
         
        />

        {/* Password */}
        <InputFloatingRHF
          id="password"
          label="Tu Contraseña"
          type="password"
          register={register("password")}
          error={errors.password?.message}
          value={watch("password")}
          icon={<HttpsOutlinedIcon/>}
        />

        <Button className="w-full py-3" type="submit" disabled={isPending}>
          {isPending ? (
            <> <p className="text-gray-dark">Cargando...</p> <Spinner bg="gray-dark"/> </>
          ) : isSuccess ? (<>
            <CheckIcon />
            </>
          ) : (
            "Iniciar Sesion"
          )}
        </Button>
      </form>
    </div>
  );
}
