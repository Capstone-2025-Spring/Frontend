import { useEffect, useState } from "react";
import "../css/EventPopup.css";
import { useEventStore } from "../store/event_store";

const EventPopupContainer = () => {
  const {
    event_active,
    event_type,
    student,
    detail,
    trigger_time,
    time_limit_ms,
  } = useEventStore();

  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let intervalId;

    if (event_active) {
      setVisible(true);
      updateTimeLeft(); // 초기 1회
      intervalId = setInterval(updateTimeLeft, 1000);
    }

    function updateTimeLeft() {
      const now = performance.now();
      const msLeft = trigger_time + time_limit_ms - now;
      const secLeft = Math.max(0, Math.floor(msLeft / 1000));
      setTimeLeft(secLeft);

      // ✅ 남은 시간이 0이면 팝업 닫기
      if (secLeft <= 0) {
        setVisible(false);
        clearInterval(intervalId);
      }
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [event_active, trigger_time, time_limit_ms]);

  if (!visible || !event_active) return null;

  return (
    <div className="Event">
      <div className={`event-popup ${visible ? "show" : ""}`}>
        🚨 <strong>{student}</strong> → {detail}
        <div className="event-timer">⏳ 남은 시간: {timeLeft}초</div>
      </div>
    </div>
  );
};

export default EventPopupContainer;
