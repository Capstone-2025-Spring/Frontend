import { create } from "zustand";
import { preprocessHolisticData } from "../api/video/upload_holistic_data";

export const useWebcam2Store = create((set, get) => ({
  isRecording: false,
  holisticLandmarker: null,
  holisticData: [],
  processedHolisticData: null,

  videoChunks: [],
  mediaRecorder: null,

  setHolisticLandmarker: (landmarker) => {
    console.log("🎯 setHolisticLandmarker 호출됨:", landmarker);
    set({ holisticLandmarker: landmarker });
  },

  setMediaRecorder: (recorder) => set({ mediaRecorder: recorder }),
  pushVideoChunk: (chunk) =>
    set((state) => ({ videoChunks: [...state.videoChunks, chunk] })),
  clearVideoChunks: () => set({ videoChunks: [] }),

  saveVideoFile: () => {
    const chunks = get().videoChunks;
    if (!chunks.length) return;

    const blob = new Blob(chunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "interview_recording.webm";
    a.click();

    URL.revokeObjectURL(url);
    set({ videoChunks: [] });
  },

  startRecording: () => {
    console.log("▶️ 녹화 시작");
    set({ isRecording: true, holisticData: [] });
  },

  stopRecording: () => {
    console.log("⏹️ 녹화 중지");
    set({ isRecording: false });
  },

  updateHolisticData: (newData) => {
    const { holisticData, isRecording } = get();
    if (isRecording) {
      const updated = [...holisticData, newData];
      console.log("🆕 데이터 추가됨");
      set({ holisticData: updated });
    }
  },

  sendHolisticDataToServer: async () => {
    const { holisticData } = get();
    if (!holisticData.length) {
      console.error("❌ 데이터 없음");
      return;
    }
    try {
      const response = await preprocessHolisticData({ holisticData });
      console.log("✅ 전송 성공:", response);
      set({ processedHolisticData: response.data });
    } catch (err) {
      console.error("❌ 전송 실패:", err);
    }
  },
}));
