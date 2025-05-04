// src/store/evaluation_result_store.js
import { create } from "zustand";

export const useEvaluationResultStore = create((set) => ({
  resultText: "",

  setResultText: (newResult) => set({ resultText: newResult }),

  clearResultText: () => set({ resultText: "" }),
}));
