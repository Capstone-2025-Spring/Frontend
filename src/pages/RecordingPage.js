// src/pages/RecordingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { sendConfigToBackend } from "../api/config/sendConfigToBackend";
import { getLectureFeedbackWithAllData } from "../api/feedback/upload_feedback";
import Webcam2Container from "../container/Webcam2Container";
import { useAudioStore } from "../store/audio_store";
import { useWebcam2Store } from "../store/webcam2_store";
import { exportConfigToJson } from "../util/config/config_exporter";

const RecordingPage = () => {
  const {
    isRecording,
    startRecording,
    stopRecording,
    sendHolisticDataToServer,
    mediaRecorder,
    saveVideoFile,
    clearVideoChunks,
    processedHolisticData,
  } = useWebcam2Store();

  const { startAudioRecording, stopAudioRecording, recordedAudioBlob } =
    useAudioStore();
  const navigate = useNavigate();

  const handleToggleRecording = async () => {
    if (isRecording) {
      stopRecording();
      stopAudioRecording();

      //설정 저장 및 서버 전송
      exportConfigToJson();
      await sendConfigToBackend();

      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }

      await sendHolisticDataToServer();
      saveVideoFile();
      clearVideoChunks();

      const result = await getLectureFeedbackWithAllData();

      navigate("/report");
    } else {
      startRecording();
      startAudioRecording();

      const recorder = mediaRecorder;
      if (recorder && recorder.state === "inactive") {
        recorder.start();
        console.log("🎥 MediaRecorder started");
      }
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  };

  const titleStyle = {
    fontSize: "1.8rem",
    marginBottom: "1rem",
  };

  const buttonStyle = {
    padding: "1rem 2rem",
    fontSize: "1.2rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: isRecording ? "#ef4444" : "#10b981", // 빨간색: 정지, 초록색: 시작
    color: "#fff",
    cursor: "pointer",
    marginBottom: "2rem",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>🎥 면접 녹화 중</h2>

      <button onClick={handleToggleRecording} style={buttonStyle}>
        {isRecording ? "⏹️ 녹화 종료" : "▶️ 녹화 시작"}
      </button>

      {/* 웹캠 및 분석 화면 */}
      <Webcam2Container />
    </div>
  );
};

export default RecordingPage;
