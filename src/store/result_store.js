// store/result_store.js
import { create } from "zustand";

export const useResultStore = create((set) => ({
  results: [],
  setResults: (results) => set({ results }),
}));
