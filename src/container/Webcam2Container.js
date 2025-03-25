import React, { useEffect, useRef } from "react";
import {
  Holistic,
  Results,
  POSE_CONNECTIONS,
  HAND_CONNECTIONS,
  FACEMESH_TESSELATION,
} from "@mediapipe/holistic";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { useWebcam2Store } from "../store/webcam2_store";
import Webcam2 from "../component/Webcam2";
import { initializeHolistic } from "../util/holisticMarker";

const Webcam2Container = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { holistic, setHolisticLandmarker } = useWebcam2Store();

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    const initHolisticLandmarker = async () => {
      const landmarker = await initializeHolistic();
      setHolisticLandmarker(landmarker);

      initPoseLandmarker();
    };

    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    holistic.onResults((results) => {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      if (results.poseLandmarks) {
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
          color: "white",
        });
        drawLandmarks(canvasCtx, results.poseLandmarks, {
          color: "white",
          fillColor: "rgb(255,138,0)",
        });
      }

      if (results.leftHandLandmarks) {
        drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
          color: "white",
        });
        drawLandmarks(canvasCtx, results.leftHandLandmarks, {
          color: "rgb(255,138,0)",
        });
      }

      if (results.rightHandLandmarks) {
        drawConnectors(
          canvasCtx,
          results.rightHandLandmarks,
          HAND_CONNECTIONS,
          {
            color: "white",
          }
        );
        drawLandmarks(canvasCtx, results.rightHandLandmarks, {
          color: "rgb(0,217,231)",
        });
      }

      if (results.faceLandmarks) {
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION, {
          color: "#C0C0C070",
          lineWidth: 1,
        });
      }

      canvasCtx.restore();
    });

    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoElement.srcObject = stream;
      videoElement.play();

      const onFrame = async () => {
        await holistic.send({ image: videoElement });
        requestAnimationFrame(onFrame);
      };
      onFrame();
    };

    startCamera();

    return () => {
      holistic.close();
      if (videoElement.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [setHolisticLandmarker]);

  return <Webcam2 videoRef={videoRef} canvasRef={canvasRef} />;
};

export default Webcam2Container;
