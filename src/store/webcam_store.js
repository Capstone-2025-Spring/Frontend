import { create } from "zustand";

export const useWebcamStore = create((set) => ({
  isWebcamRunning: false, // 웹캠 실행 상태
  poseLandmarker: null, // PoseLandmarker 객체
  landmarksData: [], // 랜드마크 데이터를 저장할 배열

  // PoseLandmarker 설정 함수
  setPoseLandmarker: (landmarker) => set({ poseLandmarker: landmarker }),

  // 웹캠 실행 상태 업데이트 함수
  setIsWebcamRunning: (isRunning) => set({ isWebcamRunning: isRunning }),

  // 랜드마크 데이터를 새로 설정하는 함수
  updateLandmarkData: (newLandmarkData) =>
    set({ landmarksData: newLandmarkData }),
}));
