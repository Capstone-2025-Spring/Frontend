import { create } from "zustand";
import { ConvertWavToMp3 } from "../util/ffmpeg/convert_wav_to_mp3";
import { useWebcam2Store } from "./webcam2_store";
export const useAudioStore = create((set, get) => ({
  mediaRecorder: null, // 전체 녹음용
  audioChunks: [], // 전체용 chunks
  recordedAudioBlob: null, // 전체 녹음 MP3
  stream: null, // 마이크 stream 저장

  eventRecorder: null, // 이벤트용
  eventChunks: [], // 이벤트 chunks
  recordedEventAudioBlob: null, // 이벤트 녹음 MP3

  // === 전체 녹음 시작 ===
  startAudioRecording: async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks = [];
      const recorder = new MediaRecorder(stream);
      const baseTime = useWebcam2Store.getState().recording_start_time;
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push({
            data: e.data,
            timestamp: performance.now() - baseTime,
          });
        }
      };

      recorder.onstop = async () => {
        const { audioChunks } = get();
        const fullBlob = new Blob(
          audioChunks.map((c) => c.data),
          {
            type: "audio/webm",
          }
        );
        const mp3Blob = await ConvertWavToMp3(fullBlob);
        if (mp3Blob) {
          set({ recordedAudioBlob: mp3Blob });
          console.log("✅ 전체 녹음 mp3 저장 완료");
        } else {
          console.error("❌ 전체 녹음 MP3 변환 실패");
        }
      };

      recorder.start(100);
      set({ mediaRecorder: recorder, audioChunks: chunks, stream });
      console.log("🎙️ 전체 오디오 녹음 시작");
    } catch (err) {
      console.error("❌ 마이크 접근 실패:", err);
    }
  },

  stopAudioRecording: () => {
    const { mediaRecorder } = get();
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      console.log("🛑 전체 오디오 녹음 종료");
    }
  },

  // === 이벤트 녹음 시작 (stream 공유) ===
  startEventRecording: () => {
    const { stream } = get();
    if (!stream) {
      console.warn("⚠️ 마이크 stream이 존재하지 않음");
      return;
    }

    const chunks = [];
    const eventRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

    eventRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    eventRecorder.start(100);
    set({ eventRecorder, eventChunks: chunks });
    console.log("🎯 이벤트 오디오 녹음 시작");
  },

  // === 이벤트 녹음 종료 및 변환
  stopEventRecordingAndConvert: () =>
    new Promise((resolve) => {
      const { eventRecorder, eventChunks } = get();
      if (!eventRecorder) {
        console.warn("⚠️ 이벤트 recorder가 존재하지 않습니다.");
        resolve(null);
        return;
      }

      eventRecorder.onstop = async () => {
        const wavBlob = new Blob(eventChunks, { type: "audio/webm" });
        console.log("📏 이벤트 녹음 종료. blob size:", wavBlob.size);

        const mp3Blob = await ConvertWavToMp3(wavBlob);
        if (mp3Blob) {
          set({ recordedEventAudioBlob: mp3Blob });
          console.log("✅ 이벤트 mp3 저장 완료");
          resolve(mp3Blob);
        } else {
          console.error("❌ 이벤트 MP3 변환 실패");
          resolve(null);
        }
      };

      eventRecorder.stop();
    }),
}));
