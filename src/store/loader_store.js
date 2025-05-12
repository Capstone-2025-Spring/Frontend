// store/loader_store.js
import { create } from "zustand";

export const useLoaderStore = create((set) => ({
  current_step: "대기 중", // or "오디오 추출 중", "포즈 분석 중", ...
  progress_percent: 0,
  estimated_time: null, // 단위: 초 또는 문자열(e.g., "예상 15초 남음")

  setLoaderState: (payload) => set(() => payload),
  updateLoader: (partial) => set((state) => ({ ...state, ...partial })),
}));
