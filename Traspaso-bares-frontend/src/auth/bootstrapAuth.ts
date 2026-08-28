import { useAuthStore } from "../store/auth.store";
import { getApiError } from "../api/apiError";
import api from "../api/axios";

export const bootstrapAuth = async () => {
  const store = useAuthStore.getState();

  console.log("🚀 bootstrapAuth iniciado", {
    hasAccessToken: !!store.accessToken,
  });

  if (store.accessToken) {
    console.log("✅ Ya existe accessToken");
    store.setHydrated(true);
    return;
  }

  try {
    console.log("🔄 Intentando /auth/refresh");

    const res = await api.post("/auth/refresh");

    console.log("✅ Refresh correcto", {
      hasAccessToken: !!res.data.accessToken,
      hasUser: !!res.data.user,
    });

    const { accessToken: newToken, user } = res.data;

    store.setAuth(user, newToken);

  } catch (error) {

    console.log("❌ Bootstrap refresh falló", {
      code: getApiError(error).code,
    });

    store.logout();

  } finally {

    console.log("💧 Bootstrap hidratado");

    store.setHydrated(true);
  }
};
