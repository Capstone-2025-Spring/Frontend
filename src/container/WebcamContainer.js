import React, { useEffect, useRef, useState } from "react";
import {
  FilesetResolver,
  PoseLandmarker,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

import Webcam from "../component/WebCam";

const Camera = () => {
  const videoRef = useRef < HTMLVideoElement > null;
  const canvasRef = useRef < HTMLCanvasElement > null;
  const [poseLandmarker, setPoseLandmarker] =
    (useState < PoseLandmarker) | (null > null);
  const [isWebcamRunning, setIsWebcamRunning] = useState(false);
  const animationFrameRef = (useRef < number) | (null > null);
  const lastVideoTimeRef = useRef < number > -1;

  // 📌 1. 모델 초기화
  useEffect(() => {
    const initPoseLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );

      const landmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 1,
      });

      setPoseLandmarker(landmarker);
    };

    initPoseLandmarker();
  }, []);

  // 📌 2. 웹캠 시작
  const enableWebcam = async () => {
    if (!poseLandmarker) {
      console.warn("PoseLandmarker not loaded yet.");
      return;
    }

    setIsWebcamRunning(true);

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      renderLoop(); // 시작!
    }
  };

  // 📌 3. 실시간 랜드마크 렌더링
  const renderLoop = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!video || !canvas || !ctx || !poseLandmarker) return;

    const drawingUtils = new DrawingUtils(ctx);

    if (video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime;

      const results = poseLandmarker.detectForVideo(video, performance.now());

      // Clear and draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (results.landmarks.length > 0) {
        for (const landmarks of results.landmarks) {
          drawingUtils.drawConnectors(
            landmarks,
            PoseLandmarker.POSE_CONNECTIONS
          );
          drawingUtils.drawLandmarks(landmarks, {
            radius: (data) => DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1),
          });
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(renderLoop);
  };

  // 📌 4. 정리 (컴포넌트 언마운트 시 스트림 중지)
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (videoRef.current?.srcObject) {
        const tracks =
          videoRef.current.srcObject instanceof MediaStream
            ? videoRef.current.srcObject.getTracks()
            : [];
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <Webcam
      enableWebcam={enableWebcam}
      isWebcamRunning={isWebcamRunning}
      videoRef={videoRef}
      canvasRef={canvasRef}
    />
  );
};

export default Camera;
