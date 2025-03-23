import React, { useEffect, useRef, useState } from "react";
import { PoseLandmarker, DrawingUtils } from "@mediapipe/tasks-vision";
import { useWebcamStore } from "../store/webcam_store"; // Zustand 스토어 import
import Webcam from "../component/Webcam"; // Webcam 컴포넌트 import
import { initializePoseLandmarker } from "../util/poseLandmarker"; // PoseLandmarker 초기화 함수 import

const WebcamContainer = () => {
  const videoRef = useRef(null); // 비디오 DOM 요소를 참조하는 useRef
  const canvasRef = useRef(null); // 캔버스 DOM 요소를 참조하는 useRef
  const {
    poseLandmarker, // poseLandmarker 상태 (Zustand)
    setPoseLandmarker, // poseLandmarker 설정 함수
    isWebcamRunning, // 웹캠 실행 여부 상태
    setIsWebcamRunning, // 웹캠 실행 상태 설정 함수
    landmarksData,
    updateLandmarkData,
  } = useWebcamStore();
  const [currentLandmarks, setCurrentLandmarks] = useState([]); // 현재 랜드마크 상태 (매 프레임마다 쌓임)
  const animationFrameRef = useRef(null); // 애니메이션 프레임을 관리하는 useRef
  const lastVideoTimeRef = useRef(-1); // 마지막 비디오 시간 (이전 프레임을 추적)
  const startTimeRef = useRef(null); // 비디오 시작 시간을 추적하는 useRef

  // 📌 1. 모델 초기화 (비동기적으로 PoseLandmarker 초기화)
  useEffect(() => {
    const initPoseLandmarker = async () => {
      const landmarker = await initializePoseLandmarker(); // PoseLandmarker 초기화 함수 호출
      setPoseLandmarker(landmarker); // 초기화된 landmarker 상태에 저장
    };

    initPoseLandmarker(); // 모델 초기화 함수 실행
  }, [setPoseLandmarker]); // 의존성 배열에 setPoseLandmarker 추가

  // 📌 2. 웹캠 시작 / 종료를 토글하는 함수
  const toggleWebcam = async () => {
    if (isWebcamRunning) {
      // 웹캠이 이미 실행 중이면, 끄는 작업
      const tracks = videoRef.current?.srcObject?.getTracks() || [];
      tracks.forEach((track) => track.stop()); // 모든 트랙을 중지하여 웹캠 종료
      setIsWebcamRunning(false); // 상태 업데이트: 웹캠이 종료되었음을 알림
      cancelAnimationFrame(animationFrameRef.current); // 애니메이션 루프 중지

      updateLandmarkData(currentLandmarks); // 상태에 데이터 저장
    } else {
      // 웹캠이 실행 중이지 않으면, 시작하는 작업
      if (!poseLandmarker) {
        console.warn("PoseLandmarker not loaded yet.");
        return; // PoseLandmarker가 로드되지 않았으면, 웹캠 시작하지 않음
      }

      setIsWebcamRunning(true); // 상태 업데이트: 웹캠이 실행 중임을 알림
      startTimeRef.current = Date.now(); // 비디오 시작 시간 기록

      const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // 웹캠 스트림 요청
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // 비디오 스트림을 video DOM 요소에 연결
        await videoRef.current.play(); // 비디오 재생 시작
        renderLoop(); // 랜드마크 렌더링 시작
      }
    }
  };

  // 📌 3. 실시간 랜드마크 렌더링
  const renderLoop = () => {
    const video = videoRef.current; // 비디오 요소 참조
    const canvas = canvasRef.current; // 캔버스 요소 참조
    const ctx = canvas?.getContext("2d"); // 캔버스 2D 컨텍스트 가져오기

    if (!video || !canvas || !ctx || !poseLandmarker) return; // 필수 요소가 없으면 리턴

    const drawingUtils = new DrawingUtils(ctx); // DrawingUtils 인스턴스 생성 (그리기 도구)

    if (video.currentTime !== lastVideoTimeRef.current) {
      // 1초 간격으로 랜드마크를 렌더링하도록 설정 (시간 체크)
      lastVideoTimeRef.current = video.currentTime; // 비디오의 현재 시간 저장

      const results = poseLandmarker.detectForVideo(video, performance.now()); // 랜드마크 감지

      // Clear and draw
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 지움
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // 비디오 프레임을 캔버스에 그림

      if (results.landmarks.length > 0) {
        // 랜드마크가 존재하면, 그리기 작업 수행
        for (const landmarks of results.landmarks) {
          drawingUtils.drawConnectors(
            landmarks,
            PoseLandmarker.POSE_CONNECTIONS // 랜드마크 간의 연결선 그리기
          );
          drawingUtils.drawLandmarks(landmarks, {
            radius: (data) => DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1), // 랜드마크 크기 설정
          });

          // 랜드마크 데이터 상태에 추가 (Zustand 상태에 랜드마크 저장)
          setCurrentLandmarks((prevLandmarks) => [
            ...prevLandmarks, // 이전 상태를 모두 복사
            {
              timestamp: Date.now(), // 랜드마크 타임스탬프
              landmarks: landmarks, // 랜드마크 좌표
            }, // 새로 받은 랜드마크 데이터 추가
          ]);
        }
      }
    }

    // 애니메이션 루프 계속 실행
    animationFrameRef.current = requestAnimationFrame(renderLoop); // 다음 프레임에서 다시 실행
  };

  useEffect(() => {
    //zustand의 state는 비동기로 처리되므로 콘솔을찍으려면 useEffect사용해야함함
    console.log(landmarksData);
  }, [landmarksData]);

  // 📌 4. 정리 (컴포넌트 언마운트 시 스트림 중지)
  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트될 때 스트리밍과 애니메이션 루프를 종료
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current); // 애니메이션 루프 취소
      }

      // 비디오 스트리밍 중지
      if (videoRef.current?.srcObject) {
        const tracks =
          videoRef.current.srcObject instanceof MediaStream
            ? videoRef.current.srcObject.getTracks()
            : []; // 스트림에서 트랙 가져오기
        tracks.forEach((track) => track.stop()); // 모든 트랙을 중지하여 스트리밍 종료
      }
    };
  }, []); // 빈 배열을 의존성으로 넣어, 컴포넌트 언마운트 시 한 번만 실행

  return (
    <Webcam
      toggleWebcam={toggleWebcam} // 웹캠 시작 함수
      isWebcamRunning={isWebcamRunning} // 웹캠 실행 상태
      videoRef={videoRef} // 비디오 요소 참조
      canvasRef={canvasRef} // 캔버스 요소 참조
      landmarksData={landmarksData}
    />
  );
};

export default WebcamContainer;
