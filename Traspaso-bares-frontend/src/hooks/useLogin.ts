import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "../api/axios";
import type { ApiError } from "../types/api";
import type { User } from "../types/user";
import { getApiError } from "../api/apiError";

type LoginData = {
  username: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};


export const useLogin = () => {
  return useMutation<
    LoginResponse,            // data success
    AxiosError<ApiError>,     // error
    LoginData                 // variables input
  >({
    mutationFn: async (data) => {
      console.log(data)
      const res = await api.post<LoginResponse>("/auth/login", data);
      return res.data;
    },

    onSuccess: (data) => {
      console.log("Login exitoso:", data);
      console.log("Usuario:", data.user);
      console.log("AccessToken:", data.accessToken);
    },

    onError: (error) => {
       const apiError = getApiError(error);
       console.log("Error:", apiError);
    },
  });
};
