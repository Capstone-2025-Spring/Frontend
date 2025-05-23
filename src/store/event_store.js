import { create } from "zustand";
import { useWebcam2Store } from "./webcam2_store";
export const useEventStore = create((set, get) => ({
  event_active: false,
  event_type: null,
  student: null,
  detail: null,
  trigger_time: null,
  time_limit_ms: null,
  isSubmittingEvent: false,
  results: [],

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
    get().save_event_info();
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

  // 🛠️ API 호출 제거 — eventInfo만 저장
  save_event_info: () => {
    const {
      event_type,
      student,
      detail,
      trigger_time,
      time_limit_ms,
      results,
    } = get();

    const start_ms = Math.floor(
      trigger_time - useWebcam2Store.getState().recording_start_time
    );
    const end_ms = start_ms + Math.floor(time_limit_ms ?? 0);

    const eventInfoJson = {
      start_ms,
      end_ms,
      description: `[${event_type}] ${detail ?? "(설명 없음)"}`,
    };

    set({
      results: [
        ...results,
        {
          timestamp: new Date().toISOString(),
          eventInfo: eventInfoJson,
        },
      ],
    });

    console.log("📥 이벤트 정보 저장:", eventInfoJson);
  },
}));
