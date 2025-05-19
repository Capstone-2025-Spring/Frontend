import { create } from "zustand";
export const useWebcam2Store = create((set, get) => ({
  isRecording: false,
  holisticLandmarker: null,
  holisticData: [],
  processedHolisticData: null,

  videoChunks: [],
  mediaRecorder: null,

  processedEventHolisticData: null, // ✅ 이벤트 구간 데이터
  eventStartTime: null, //

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
    set({ isRecording: true, holisticData: [] });
  },

  stopRecording: () => {
    console.log("⏹️ 녹화 중지");
    set({ isRecording: false });
  },

  // ✅ 이벤트 시작 시간 기록
  markEventStart: () => {
    set({ eventStartTime: performance.now() });
    console.log("📍 holistic 이벤트 시작 시각 저장");
  },

  // ✅ 이벤트 종료 시 해당 구간만 추출
  markEventEndAndExtract: () => {
    const { holisticData, eventStartTime } = get();
    const eventEndTime = performance.now();

    if (!eventStartTime) {
      console.warn("⚠️ 이벤트 시작 시각 없음");
      return;
    }

    const extracted = holisticData.filter(
      (frame) =>
        frame.timestamp >= eventStartTime && frame.timestamp <= eventEndTime
    );

    const processed = {
      eventId: `${Math.floor(eventStartTime)}_${Math.floor(eventEndTime)}`,
      holisticData: extracted.map((frame) => ({
        timestamp: frame.timestamp,
        results:
          frame.results?.poseLandmarks?.map((lm) => ({
            x: lm.x,
            y: lm.y,
            z: lm.z,
            visibility: lm.visibility,
          })) ?? [],
      })),
    };

    set({ processedEventHolisticData: processed });
    console.log("✅ 이벤트 holistic 구간 추출 완료");
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
      // 🆕 전처리 직접 수행
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
          timestamp: frame.timestamp,
          results:
            frame.results?.poseLandmarks?.map((lm) => ({
              x: lm.x,
              y: lm.y,
              z: lm.z,
              visibility: lm.visibility,
            })) ?? [],
        })),
      };

      //console.log("📤 전송 데이터:", cleaned);
      set({ processedHolisticData: cleaned });
      /*const response = await upload_holistic_data(cleaned);
      console.log("✅ 전송 성공:");*/
    } catch (err) {
      console.error("❌ 전송 실패:", err.response?.data || err.message);
    }
  },
}));
