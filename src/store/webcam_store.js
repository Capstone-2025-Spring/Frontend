import { create } from "zustand";
import { preprocessPoseLandmarkerData } from "../api/video/upload_landmark_data";

export const useWebcamStore = create((set, get) => ({
  isWebcamRunning: false, // 웹캠 실행 상태
  poseLandmarker: null, // PoseLandmarker 객체
  landmarksData: [], // 랜드마크 데이터를 저장할 배열
  processedPoseData: null,

  // PoseLandmarker 설정 함수
  setPoseLandmarker: (landmarker) => set({ poseLandmarker: landmarker }),

  // 웹캠 실행 상태 업데이트 함수
  setIsWebcamRunning: (isRunning) => set({ isWebcamRunning: isRunning }),

  // 랜드마크 데이터를 새로 설정하는 함수
  updateLandmarkData: (newLandmarkData) =>
    set({ landmarksData: newLandmarkData }),

  sendLandmarkDataToServer: async () => {
    const { landmarksData } = get();

    if (!landmarksData || landmarksData.length === 0) {
      console.error("Missing landmark data");
      return;
    }

    try {
      // API 호출
      const response = await preprocessPoseLandmarkerData({
        landmarksData,
      });

      console.log("Data sent successfully:", response);

      // 응답 데이터를 processedPoseData에 업데이트
      set({ processedPoseData: response.data });
    } catch (error) {
      console.error("Failed to send data:", error);
    }
  },
}));
