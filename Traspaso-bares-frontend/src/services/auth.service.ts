import api from "../api/axios";
import { queryClient } from "../lib/queryClient";
import { useAuthStore } from "../store/auth.store";

export const logoutUser = async () => {
  try {
    const res = await api.post("/auth/logout");
    console.log(res.data.message);
  } catch (e) {
    // si falla red, igual cerramos sesión local
  } finally {
     useAuthStore.getState().logout();
     queryClient.clear();
  }
};
