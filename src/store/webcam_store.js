import { create } from "zustand";

export const useWebcamStore = create((set) => ({
  isWebcamRunning: false,
  poseLandmarker: null,
  landmarksData: [], // 랜드마크 데이터를 저장할 배열
  setPoseLandmarker: (landmarker) => set({ poseLandmarker: landmarker }),
  setIsWebcamRunning: (isRunning) => set({ isWebcamRunning: isRunning }),
  addLandmarkData: (newLandmarkData) =>
    set((state) => ({
      landmarksData: [...state.landmarksData, newLandmarkData], // 새 랜드마크 데이터를 기존에 추가
    })),
}));
