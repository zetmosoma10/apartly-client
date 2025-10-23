import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "./entities/User";

type AuthState = {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
  _hasHydrated: boolean;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      _hasHydrated: false,

      setToken: (token) => set(() => ({ token })),

      setUser: (user) => set(() => ({ user })),

      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "apartly-storage",
      onRehydrateStorage: () => (state) => {
        state!._hasHydrated = true;
      },
    }
  )
);

export default useAuthStore;
