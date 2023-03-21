import { create } from "zustand";

import UserModel from "../../api/user/UserModel";

export type UserState = {
  user?: UserModel;
  setUser: (user: UserModel) => void;
};

export const useStoreUser = create<UserState>()((set) => ({
  user: undefined,
  setUser: (user: UserModel) => set(() => ({ user: user })),
}));
