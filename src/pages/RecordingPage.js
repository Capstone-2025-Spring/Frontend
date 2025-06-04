// src/pages/RecordingPage.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventPopupContainer from "../container/EventPopupContainer";
import MainWindowContainer from "../container/MainWindowContainer";
import Webcam2Container from "../container/Webcam2Container";
import "../css/RecordingPage.css";
import { useAudioStore } from "../store/audio_store";
import { useEventStore } from "../store/event_store";
import { useWebcam2Store } from "../store/webcam2_store";
import { exportConfigToJson } from "../util/config/config_exporter";
import { triggerSingleRandomEvent } from "../util/event/triggerSingleRandomEvent";

const RecordingPage = () => {
  const clear_event = useEventStore((state) => state.clear_event);
  const {
    isRecording,
    startRecording,
    stopRecording,
    mediaRecorder,
    videoBlobUrl,
  } = useWebcam2Store();

  const { startAudioRecording, stopAudioRecording } = useAudioStore();
  const navigate = useNavigate();

  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
      setIntervalId(timer);
    } else {
      clearInterval(intervalId);
      setSecondsElapsed(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  useEffect(() => {
    return () => {
      clear_event();
    };
  }, []);

  // ✅ 녹화가 끝나고 videoBlobUrl이 생성되면 자동 이동
  useEffect(() => {
    if (videoBlobUrl) {
      console.log("✅ 녹화 완료, 페이지 이동:", videoBlobUrl);
      navigate("/loading-live");
    }
  }, [videoBlobUrl]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
      stopAudioRecording();
      exportConfigToJson();

      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop(); // 이후 onstop → Blob 생성 → 상태 업데이트 → 이동
      }
    } else {
      startRecording();
      startAudioRecording();
      triggerSingleRandomEvent();
      const recorder = mediaRecorder;
      if (recorder && recorder.state === "inactive") {
        recorder.start();
        console.log("MediaRecorder started");
      }
    }
  };

  return (
    <div className="recording-page">
      <header className="recording-header">
        <h2 className="recording-title">실시간 강의 시뮬레이션</h2>
        <div className="recording-controls">
          {isRecording && (
            <div className="recording-timer">{formatTime(secondsElapsed)}</div>
          )}
          <button
            onClick={handleToggleRecording}
            className={`record-button ${isRecording ? "stop" : "start"}`}
          >
            {isRecording ? " 강의 종료" : "강의 시작"}
          </button>
        </div>
      </header>

      <main className="recording-main">
        <MainWindowContainer />
      </main>
      <EventPopupContainer />
      <div className="recording-webcam">
        <Webcam2Container />
      </div>
    </div>
  );
};

export default RecordingPage;
