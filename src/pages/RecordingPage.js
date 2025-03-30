// src/pages/RecordingPage.js
import React from "react";
import { useWebcam2Store } from "../store/webcam2_store";
import { useAudioStore } from "../store/audio_store";
import Webcam2Container from "../container/Webcam2Container";
import { useNavigate } from "react-router-dom";

const RecordingPage = () => {
  const {
    isRecording,
    startRecording,
    stopRecording,
    sendHolisticDataToServer,
    mediaRecorder,
    saveVideoFile,
    clearVideoChunks,
  } = useWebcam2Store();

  const { startAudioRecording, stopAudioRecording } = useAudioStore();
  const navigate = useNavigate();

  const handleToggleRecording = async () => {
    if (isRecording) {
      stopRecording();
      stopAudioRecording();
      await sendHolisticDataToServer();

      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop(); // ✅ 영상 녹화 중지
      }

      await sendHolisticDataToServer();
      saveVideoFile(); // ✅ 영상 다운로드
      clearVideoChunks();

      // ReportPage로 이동
      navigate("/report");
    } else {
      startRecording();
      startAudioRecording();
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
