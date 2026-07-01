import axios from "axios";
import type { ApiError } from "../types/api";

export const getApiError = (error: unknown): ApiError => {
  if (!axios.isAxiosError(error)) {
    return {
      status: null,
      code: "UNKNOWN_ERROR",
      message: "Error inesperado",
    };
  }

  const data = error.response?.data;

  const apiError = data?.error ?? data;

  if (!apiError) {
    return {
      status: error.response?.status ?? null,
      code: "NETWORK_ERROR",
      message: "No se pudo conectar con el servidor",
    };
  }

  return {
    status: apiError.status ?? error.response?.status ?? null,
    code: apiError.code ?? "UNKNOWN_CODE",
    message: apiError.message ?? "Error desconocido",
    fields: apiError.fields ?? null,
  };
};
