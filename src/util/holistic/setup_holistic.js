// util/holistic/setup_holistic.js
import { initializeHolistic } from "./init_holistic";
import { drawHolisticResults } from "./draw_holistic";

/**
 * Holistic 모델을 초기화하고, 실시간으로 웹캠 비디오 프레임에서 결과(랜드마크)를 처리하는 함수
 *
 * @param {HTMLVideoElement} videoElement 웹캠으로부터 비디오 프레임을 받을 video 요소
 * @param {HTMLCanvasElement} canvasElement Holistic 결과를 그릴 canvas 요소
 * @param {Function} setHolisticLandmarker Holistic 인스턴스를 저장하는 상태 관리 함수
 * @param {Function} onResultsCallback Holistic 결과 데이터를 추가적으로 처리할 콜백 함수
 */
export const setupHolistic = async (
  videoElement,
  canvasElement,
  setHolisticLandmarker,
  onResultsCallback
) => {
  // canvas 요소의 2D 컨텍스트 가져오기 (Holistic 결과를 캔버스에 그리기 위함)
  const canvasCtx = canvasElement.getContext("2d");

  // Holistic 모델 초기화 및 Zustand 상태에 저장
  const landmarker = await initializeHolistic();
  setHolisticLandmarker(landmarker);

  // Holistic 모델의 옵션을 설정 (정확도, 세부 설정)
  landmarker.setOptions({
    modelComplexity: 1, // 모델 복잡도 설정 (0~2, 높을수록 정확도 증가, 성능 저하)
    smoothLandmarks: true, // 랜드마크 부드럽게 처리 여부
    enableSegmentation: false, // 신체 분할(segmentation) 비활성화 (필요 없으면 false)
    smoothSegmentation: true, // 분할(segmentation)을 부드럽게 처리 여부
    minDetectionConfidence: 0.5, // 최소 탐지 신뢰도
    minTrackingConfidence: 0.5, // 최소 추적 신뢰도
  });

  // Holistic 모델이 프레임 처리를 끝낼 때마다 실행되는 이벤트 핸들러
  landmarker.onResults((results) => {
    // 결과를 캔버스에 그림 (랜드마크 시각화)
    drawHolisticResults(results, canvasCtx, canvasElement);

    // 외부 콜백 함수가 있으면, 결과 데이터를 추가적으로 처리
    if (onResultsCallback) {
      onResultsCallback(results);
    }
  });

  /**
   * 각 프레임마다 Holistic 모델에 웹캠 비디오 프레임을 전달하여 랜드마크를 분석하는 함수
   * 안정성을 위해 videoElement의 readyState를 체크하여, 데이터가 충분히 로딩된 경우에만 처리.
   * 이 체크를 통해 메모리 과부하나 충돌(Abort 오류) 방지 가능.
   */
  const onFrame = async () => {
    // 비디오가 충분한 데이터를 갖고 있는지 체크 (안정성 향상)
    if (videoElement.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      await landmarker.send({ image: videoElement }); // Holistic에 현재 비디오 프레임 전송
    }

    // 다음 프레임 처리 요청 (연속적으로 호출됨)
    requestAnimationFrame(onFrame);
  };

  // 프레임 처리 시작
  onFrame();
};
