import { create } from "zustand";

export const useWebcam2Store = create((set, get) => ({
  isRecording: false,
  holisticLandmarker: null,
  holisticData: [],
  processedHolisticData: null,

  videoChunks: [],
  mediaRecorder: null,

  recording_start_time: null, // ✅ 녹화 기준 시간

  setHolisticLandmarker: (landmarker) => {
    console.log("setHolisticLandmarker 호출됨:", landmarker);
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
    set({
      isRecording: true,
      holisticData: [],
      recording_start_time: performance.now(), // ✅ 기준 시간 저장
    });
  },

  stopRecording: () => {
    console.log("⏹️ 녹화 중지");
    set({ isRecording: false });
  },

  updateHolisticData: (newData) => {
    const { holisticData, isRecording, recording_start_time } = get();
    if (isRecording && recording_start_time !== null) {
      const timestamp = performance.now() - recording_start_time;
      const updated = [...holisticData, { ...newData, timestamp }];
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
      const videoId = (() => {
        const now = new Date();
        const pad = (n) => n.toString().padStart(2, "0");
        const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
          now.getDate()
        )}`;
        const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(
          now.getSeconds()
        )}`;
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `video_${date}_${time}_${random}`;
      })();

      const cleaned = {
        videoId,
        holisticData: holisticData.map((frame) => ({
          timestamp: Math.floor(frame.timestamp),
          results:
            frame.results?.poseLandmarks?.map((lm) => ({
              x: lm.x,
              y: lm.y,
              z: lm.z,
              visibility: lm.visibility,
            })) ?? [],
        })),
      };

      set({ processedHolisticData: cleaned });
    } catch (err) {
      console.error("❌ 전송 실패:", err.response?.data || err.message);
    }
  },
}));
