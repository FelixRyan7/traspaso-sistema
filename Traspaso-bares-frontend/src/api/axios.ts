import axios from "axios";
import { useAuthStore } from "../store/auth.store";
import { queryClient } from "../lib/queryClient";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// ======================
// REQUEST INTERCEPTOR
// ======================
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ======================
// RESPONSE INTERCEPTOR
// ======================
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const errorCode = error.response?.data?.error?.code;
    console.log("ERROR RAW:", error.response?.data);

    // SOLO si el token ha expirado
    if (
      error.response?.status === 401 &&
      errorCode === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;
      try {
        const res = await axios.post(
          import.meta.env.VITE_API_REFRESH_URL,
          {},
          { withCredentials: true }
        );
        console.log("Refresh ok ")
        const { accessToken, user } = res.data;

        // guardar nuevo estado
        useAuthStore.getState().setAuth(user, accessToken);

        // reintentar request original
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        console.log(refreshError)

        useAuthStore.getState().logout();

        return Promise.reject(refreshError);
      }
      }

    // 🚨 cualquier otro error (NO_TOKEN, INVALID_TOKEN, etc.)
    const authErrors = [
      "INVALID_TOKEN",
      "NO_TOKEN",
      "REVOKED_SESSION",
      "INVALID_REFRESH",
      "EXPIRED_SESSION"
    ];

    if (authErrors.includes(errorCode)) {
      console.log(errorCode)
      try {
        await api.post("/auth/logout");
      } catch (e) {
        console.log("logout backend failed", e);
      }

      useAuthStore.getState().logout();
      queryClient.clear();
}
if (error.response?.status === 403 &&  window.location.pathname !== "/403") {
  window.location.href = "/403";
}
    return Promise.reject(error);
    
  }
);

export default api;
