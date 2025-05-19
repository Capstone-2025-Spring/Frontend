import { create } from "zustand";
import { uploadEventData } from "../api/feedback/upload_event";
import { useAudioStore } from "./audio_store";
import { useConfigStore } from "./config_store";
import { useWebcam2Store } from "./webcam2_store";

export const useEventStore = create((set, get) => ({
  event_active: false,
  event_type: null,
  student: null,
  detail: null,
  trigger_time: null,
  time_limit_ms: null,
  isSubmittingEvent: false,
  results: [], // ✅ 이벤트 평가 결과 저장

  // ✅ 이벤트 트리거
  trigger_event: ({
    event_type,
    student = null,
    detail = null,
    time_limit_ms = null,
  }) => {
    const now = performance.now();
    const time_limit =
      time_limit_ms ?? Math.floor(Math.random() * 20000) + 10000;

    set({
      event_active: true,
      event_type,
      student,
      detail,
      trigger_time: now,
      time_limit_ms: time_limit,
    });

    console.log(
      `[EVENT TRIGGERED] type=${event_type}, student=${student}, time_limit=${
        time_limit / 1000
      }s, detail=${detail}`
    );
  },

  clear_event: () =>
    set({
      event_active: false,
      event_type: null,
      student: null,
      detail: null,
      trigger_time: null,
      time_limit_ms: null,
    }),

  // ✅ 평가 요청 + 결과 저장
  submit_event_feedback: async () => {
    const { event_type, student, detail, clear_event, results } = get();

    const eventInfo = `[EVENT] ${event_type} | 대상: ${
      student ?? "?"
    } | 설명: ${detail ?? "?"}`;
    const config = useConfigStore.getState().config;
    const audioBlob = useAudioStore.getState().recordedEventAudioBlob;
    const holisticData = useWebcam2Store.getState().processedEventHolisticData;

    if (!audioBlob || !holisticData) {
      console.warn("❗ 오디오 또는 포즈 데이터 없음, 업로드 생략");
      return;
    }

    try {
      set({ isSubmittingEvent: true });
      const response = await uploadEventData({
        audio: audioBlob,
        holistic: holisticData,
        config,
        eventInfo,
      });

      set({
        results: [
          ...results,
          {
            timestamp: new Date().toISOString(),
            eventInfo,
            response,
          },
        ],
      });

      console.log("✅ 이벤트 평가 완료:", response);
    } catch (err) {
      console.error("❌ 이벤트 평가 실패:", err);
    } finally {
      clear_event();
      set({ isSubmittingEvent: false });
    }
  },
}));
