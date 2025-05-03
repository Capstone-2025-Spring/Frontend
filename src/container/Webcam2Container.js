import React, { useEffect, useRef } from "react";
import { useWebcam2Store } from "../store/webcam2_store";
import Webcam2 from "../component/Webcam2";
import { initWebcam } from "../util/webcam/init_webcam";
import { setupHolistic } from "../util/holistic/setup_holistic";

const Webcam2Container = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const {
    holistic,
    setHolisticLandmarker,
    isRecording,
    updateHolisticData,
    setMediaRecorder,
    pushVideoChunk,
  } = useWebcam2Store();

  const last_saved_time = useRef(0); // 마지막으로 저장된 시간을 기록 (1초 간격 저장)

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    if (!videoElement || !canvasElement) {
      console.warn("videoElement or canvasElement not ready yet.");
      return;
    }

    const start = async () => {
      await initWebcam(videoElement); // 웹캠 초기화
      const stream = videoElement.srcObject;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          pushVideoChunk(event.data);
        }
      };

      setMediaRecorder(mediaRecorder);

      await setupHolistic(
        videoElement,
        canvasElement,
        setHolisticLandmarker,
        (results) => {
          const now = Date.now();
          const recording = useWebcam2Store.getState().isRecording;
          // 🔥 녹화 중이고, 1초(1000ms)마다만 데이터를 저장하는 로직 추가
          if (recording && now - last_saved_time.current >= 1000) {
            last_saved_time.current = now; // 마지막 저장 시간 갱신
            updateHolisticData({
              timestamp: now,
              results, // Holistic 결과 데이터 저장
            });
            console.log("✅ Holistic data saved at:", new Date(now));
          }
        }
      );
    };

    start();

    // 웹캠 종료 및 Holistic 모델 정리 작업
    return () => {
      if (holistic?.close) holistic.close();
      if (videoElement?.srcObject) {
        videoElement.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [setHolisticLandmarker, holistic, updateHolisticData]);

  return <Webcam2 videoRef={videoRef} canvasRef={canvasRef} />;
};

export default Webcam2Container;
