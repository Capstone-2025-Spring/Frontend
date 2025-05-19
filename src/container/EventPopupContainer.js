import { useEffect, useRef, useState } from "react";
import "../css/EventPopup.css";
import { useAudioStore } from "../store/audio_store";
import { useConfigStore } from "../store/config_store";
import { useEventStore } from "../store/event_store";
import { useWebcam2Store } from "../store/webcam2_store";

const EventPopupContainer = () => {
  const {
    event_active,
    event_type,
    student,
    detail,
    trigger_time,
    time_limit_ms,
    clear_event,
    submit_event_feedback,
  } = useEventStore();

  const config = useConfigStore((s) => s.config);
  const startEventRecording = useAudioStore((s) => s.startEventRecording);
  const stopEventRecordingAndConvert = useAudioStore(
    (s) => s.stopEventRecordingAndConvert
  );

  const markPoseStart = useWebcam2Store((s) => s.markEventStart);
  const markPoseEnd = useWebcam2Store((s) => s.markEventEndAndExtract);
  const eventPoseData = useWebcam2Store((s) => s.processedEventHolisticData);

  const [timeLeft, setTimeLeft] = useState(0);
  const currentEventId = useRef(null);
  const intervalRef = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!event_active || !trigger_time || !time_limit_ms) return;

    const event_id = `${trigger_time}-${time_limit_ms}`;
    currentEventId.current = event_id;
    hasStarted.current = false;
    console.log(`[EVENT START] id=${event_id}`);

    const update = () => {
      const now = performance.now();
      const msLeft = trigger_time + time_limit_ms - now;
      const secLeft = Math.max(0, Math.floor(msLeft / 1000));
      setTimeLeft(secLeft);

      if (!hasStarted.current) {
        startEventRecording(); // ✅ 오디오 녹음 시작
        markPoseStart(); // ✅ 포즈 시작 기록
        hasStarted.current = true;
        console.log(`[📍 이벤트 녹음 시작]`);
      }

      if (secLeft <= 0) {
        clearInterval(intervalRef.current);
        if (currentEventId.current === event_id) {
          console.log(`[EVENT END] id=${event_id}`);

          // ✅ popup 상태 먼저 제거 (UI 반응 빠르게)
          clear_event();

          // ✅ API 호출은 비동기로 백그라운드 처리
          handleEventEnd(event_id);
        }
      }
    };

    update();
    intervalRef.current = setInterval(update, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [event_active, trigger_time, time_limit_ms]);

  async function handleEventEnd(event_id) {
    const eventInfo = `[EVENT] ${event_type} | 대상: ${
      student ?? "?"
    } | 설명: ${detail ?? "?"}`;

    try {
      console.log("📦 이벤트 종료 및 데이터 추출 중...");
      const audioBlob = await stopEventRecordingAndConvert(); // ✅ MP3 변환 포함
      await markPoseEnd();

      const latestPoseData =
        useWebcam2Store.getState().processedEventHolisticData;

      if (!audioBlob || !latestPoseData) {
        console.warn("❗ 이벤트 오디오 또는 포즈 데이터 없음: 업로드 생략");
        return;
      }

      await submit_event_feedback({
        audio: audioBlob,
        holistic: latestPoseData,
        eventInfo,
      });
      console.log(`✅ 이벤트(${event_id}) 평가 요청 전송 완료`);
    } catch (err) {
      console.error(`❌ 이벤트(${event_id}) 평가 요청 실패`, err);
    } finally {
    }
  }

  if (!event_active) return null;

  return (
    <div className="Event">
      <div className="event-popup show">
        🚨 <strong>{student}</strong> → {detail}
        <div className="event-timer">⏳ 남은 시간: {timeLeft}초</div>
      </div>
    </div>
  );
};

export default EventPopupContainer;
