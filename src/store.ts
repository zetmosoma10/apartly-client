import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import type { User } from "./entities/User";

type DecodedToken = {
  _id: string;
  firstName: string;
  lastName: string;
  role: "tenant" | "landlord" | "admin";
  exp: number;
};

type AuthState = {
  token: string | null;
  user: DecodedToken | null;
  userDetail: User | null;
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
      userDetail: null,
      _hasHydrated: false,

      setToken: (token) => {
        try {
          const decoded = jwtDecode<DecodedToken>(token);

          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            set({ token: null, user: null });
            return;
          }
          set({ token, user: decoded });
        } catch (err) {
          console.error("Invalid token:", err);
          set({ token: null, user: null });
        }
      },

      setUser: (user) => set(() => ({ userDetail: user })),

      clearAuth: () => set({ token: null, user: null, userDetail: null }),
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
