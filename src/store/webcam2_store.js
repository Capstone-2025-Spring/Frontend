import { create } from "zustand";

export const useWebcam2Store = create((set, get) => ({
  setHolisticmarker: (landmarker) => set({ holisticLandmarker: landmarker }),
}));
