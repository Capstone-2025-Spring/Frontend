import React, { useEffect, useRef } from "react";
import Webcam2 from "../component/Webcam2";
import { useWebcam2Store } from "../store/webcam2_store";
import { setupHolistic } from "../util/holistic/setup_holistic";
import { initWebcam } from "../util/webcam/init_webcam";

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

          if (recording) {
            updateHolisticData({
              timestamp: now,
              results: results.poseLandmarks, // Holistic 결과 전체 저장
            });
            console.log("✅ Holistic frame saved at:", new Date(now));
            console.log("FPS 측정:", 1000 / (now - last_saved_time.current));
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
