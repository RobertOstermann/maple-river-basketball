import { create } from "zustand";

export type AuthenticationState = {
  token: string;
  setToken: (token: string) => void;
};

export const useAuthenticationStore = create<AuthenticationState>()((set) => ({
  token: "",
  setToken: (token: string) => set(() => ({ token: token })),
}));
