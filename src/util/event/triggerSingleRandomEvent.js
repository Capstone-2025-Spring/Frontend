import { useEventStore } from "../../store/event_store";
import { eventTypes } from "../config/event_types";

export function triggerSingleRandomEvent(initialDelay = 1000) {
  const triggerOneEvent = () => {
    const chosen = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const student =
      chosen.students[Math.floor(Math.random() * chosen.students.length)];

    let detail = "";
    switch (chosen.type) {
      case "question":
        detail =
          chosen.questions[Math.floor(Math.random() * chosen.questions.length)];
        break;
      case "bathroom":
        detail =
          chosen.actions[Math.floor(Math.random() * chosen.actions.length)];
        break;
      case "noise":
        detail =
          chosen.scenarios[Math.floor(Math.random() * chosen.scenarios.length)];
        break;
      case "sleep":
        detail =
          chosen.states[Math.floor(Math.random() * chosen.states.length)];
        break;
      default:
        detail = "이벤트 내용 없음";
    }
    const [min, max] = chosen.time_limit_range || [10000, 20000];
    const time_limit_ms = Math.floor(Math.random() * (max - min)) + min;

    useEventStore.getState().trigger_event({
      event_type: chosen.type,
      student,
      detail,
      time_limit_ms,
    });
  };

  let eventTimerId = setTimeout(triggerOneEvent, initialDelay);
}
