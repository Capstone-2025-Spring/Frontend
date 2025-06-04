import { create } from "zustand";

export const useWebcam2Store = create((set, get) => ({
  isRecording: false,
  holisticLandmarker: null,
  holisticData: [],
  processedHolisticData: null,
  videoBlobUrl: null,
  videoChunks: [],
  mediaRecorder: null,
  recordedBlob: null,
  recording_start_time: null,

  setHolisticLandmarker: (landmarker) => {
    console.log("setHolisticLandmarker 호출됨:", landmarker);
    set({ holisticLandmarker: landmarker });
  },

  setMediaRecorder: (recorder) => {
    recorder.onstop = async () => {
      const chunks = get().videoChunks;
      if (!chunks.length) {
        console.warn("⛔ videoChunks가 비어 있음");
        return;
      }

      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      set({ recordedBlob: blob, videoBlobUrl: url });
      console.log("✅ Blob 생성 완료:", url);

      // 후처리: holisticData 전송
      const { sendHolisticDataToServer } = get();
      await sendHolisticDataToServer();

      // 여기서 navigate를 직접 호출할 수 없으니
      // navigate("/loading-live")는 RecordingPage에서 상태 변화 감지 후 수행해야 함
    };

    set({ mediaRecorder: recorder });
  },

  pushVideoChunk: (chunk) =>
    set((state) => ({ videoChunks: [...state.videoChunks, chunk] })),
  clearVideoChunks: () => set({ videoChunks: [] }),

  startRecording: () => {
    console.log("▶️ 녹화 시작");
    set({
      isRecording: true,
      holisticData: [],
      recording_start_time: performance.now(),
      videoBlobUrl: null,
      recordedBlob: null,
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
      console.log("✅ Holistic 데이터 전송 준비 완료:", cleaned);
    } catch (err) {
      console.error("❌ 전송 실패:", err.response?.data || err.message);
    }
  },

  setVideoBlobUrl: (url) => set({ videoBlobUrl: url }),

  setUploadedVideoFile: (file) => {
    const url = URL.createObjectURL(file);
    set({
      videoBlobUrl: url,
      recordedBlob: file,
      sourceType: "upload", // 'live' or 'upload'
    });
  },
}));
