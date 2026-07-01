import { useAuthStore } from "../store/auth.store";
import { getApiError } from "../api/apiError";
import api from "../api/axios";

export const bootstrapAuth = async () => {
  const store = useAuthStore.getState();

  // Si ya hay token no hacemos nada
  if (store.accessToken) {
    store.setHydrated(true)
    return;
  } 

  try {
    const res = await api.post("/auth/refresh")

    const { accessToken: newToken, user } = res.data;

    store.setAuth(user, newToken);

  } catch (error) {
    console.log(getApiError(error).code)
    store.logout();
  } finally {
    store.setHydrated(true)
  }
};
