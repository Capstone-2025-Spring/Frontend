// src/pages/RecordingPage.js
import React from "react"; // React 라이브러리 import
import { useWebcam2Store } from "../store/webcam2_store"; // Zustand로 관리하는 웹캠 관련 상태 관리 스토어 import
import { useAudioStore } from "../store/audio_store"; // Zustand로 관리하는 오디오 관련 상태 관리 스토어 import
import Webcam2Container from "../container/Webcam2Container"; // 웹캠 및 Holistic 분석을 담당하는 컨테이너 컴포넌트 import

const RecordingPage = () => {
  // `useWebcam2Store`에서 녹화 상태 및 관련 함수들 가져오기
  const {
    isRecording, // 녹화 상태: true/false
    startRecording, // 녹화 시작 함수
    stopRecording, // 녹화 종료 함수
    sendHolisticDataToServer, // 서버로 Holistic 데이터 전송 함수
  } = useWebcam2Store();

  // `useAudioStore`에서 오디오 녹음 관련 함수들 가져오기
  const { startAudioRecording, stopAudioRecording } = useAudioStore();

  // 녹화/녹음 시작/중지 버튼 클릭 시 실행되는 함수
  const handleToggleRecording = async () => {
    if (isRecording) {
      // 녹화 중일 경우
      stopRecording(); // 녹화 종료
      stopAudioRecording(); // 오디오 녹음 종료
      await sendHolisticDataToServer(); // Holistic 데이터를 서버로 전송
    } else {
      // 녹화 중이 아닐 경우
      startRecording(); // 녹화 시작
      startAudioRecording(); // 오디오 녹음 시작
    }
  };

  return (
    <div>
      <h2>▶️ Recording Page</h2>
      {/* 녹화 상태에 따라 버튼 텍스트 변경 */}
      <button onClick={handleToggleRecording}>
        {isRecording ? "⏹️ Stop Recording" : "▶️ Start Recording"}
      </button>
      {/* Webcam2Container를 렌더링하여 웹캠 비디오와 Holistic 분석을 보여줌 */}
      <Webcam2Container />
    </div>
  );
};

export default RecordingPage; // 이 페이지 컴포넌트를 다른 곳에서 사용하기 위해 export
