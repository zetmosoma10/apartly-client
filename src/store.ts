import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "tenant" | "landlord" | "admin";
  exp: number;
};

type AuthState = {
  token: string | null;
  user: DecodedToken | null;
  setToken: (token: string) => void;
  clearAuth: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

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

      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "apartly-storage",
    }
  )
);

export default useAuthStore;
