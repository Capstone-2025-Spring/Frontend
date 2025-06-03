import { useEffect, useRef, useState } from "react";
import "../css/EventPopup.css";
import { useEventStore } from "../store/event_store";

const EventPopupContainer = () => {
  const {
    event_active,
    student,
    detail,
    trigger_time,
    time_limit_ms,
    clear_event,
    event_type,
  } = useEventStore();

  const [timeLeft, setTimeLeft] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!event_active || !trigger_time || !time_limit_ms) return;

    const update = () => {
      const now = performance.now();
      const msLeft = trigger_time + time_limit_ms - now;
      const secLeft = Math.max(0, Math.floor(msLeft / 1000));
      setTimeLeft(secLeft);

      if (secLeft <= 0) {
        clearInterval(intervalRef.current);
        clear_event();
      }
    };

    update();
    intervalRef.current = setInterval(update, 1000);

    return () => clearInterval(intervalRef.current);
  }, [event_active, trigger_time, time_limit_ms]);

  if (!event_active) return null;
  // ✅ 이미지 경로 (event_type 기준)
  const imageUrl = `/event_images/${event_type || "default"}.png`;
  return (
    <div className="Event">
      <div className="event-popup show">
        <img
          src={imageUrl}
          alt={event_type}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "contain",
            marginBottom: "0.5rem",
          }}
        />
        <strong>{student}</strong> → {detail}
        <div className="event-timer"> 남은 시간: {timeLeft}초</div>
      </div>
    </div>
  );
};

export default EventPopupContainer;
