import { create } from "zustand";

export const useMainStore = create((set) => ({
  userValues: null,
  setUserValues: (newUserValues) =>
    set((state) => ({
      userValues: newUserValues,
    })),
}));
