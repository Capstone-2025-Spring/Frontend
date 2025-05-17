import { create } from "zustand";

export const useEventStore = create((set) => ({
  event_active: false,
  event_type: null,
  student: null,
  detail: null,
  trigger_time: null,
  time_limit_ms: null,

  // ✅ 객체를 인자로 받는 방식으로 수정
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
}));
