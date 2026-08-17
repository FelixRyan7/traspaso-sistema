import { create } from "zustand";
import type { User } from "../types/user";


type AuthState = {
  user: User | null;
  accessToken: string | null;
  hydrated: boolean;

  setAuth: (user: User, token: string) => void;
  setToken: (token: string) => void;
  setHydrated: (value:boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  hydrated: false,

  setAuth: (user, token) =>
    set({
      user,
      accessToken: token,
    }),

  setToken: (token) =>
    set({
      accessToken: token,
    }),

    setHydrated: (value) =>
    set({
      hydrated: value,
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
    }),
}));
