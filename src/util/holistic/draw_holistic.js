// util/holistic/drawHolistic.js

import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { POSE_CONNECTIONS } from "@mediapipe/holistic";

/**
 * MediaPipe Holistic 결과를 캔버스에 그려주는 함수
 * @param {Object} results - Holistic 결과 객체
 * @param {CanvasRenderingContext2D} canvasCtx - 캔버스 컨텍스트
 * @param {HTMLCanvasElement} canvas - 캔버스 요소
 */
export const drawHolisticResults = (results, canvasCtx, canvas) => {
  if (!canvasCtx || !canvas) return;

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

  if (results.poseLandmarks) {
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
      color: "white",
    });
    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: "white",
      fillColor: "rgb(255,138,0)",
    });
  }
  /*
  if (results.leftHandLandmarks) {
    drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
      color: "white",
    });
    drawLandmarks(canvasCtx, results.leftHandLandmarks, {
      color: "rgb(255,138,0)",
    });
  }

  if (results.rightHandLandmarks) {
    drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
      color: "white",
    });
    drawLandmarks(canvasCtx, results.rightHandLandmarks, {
      color: "rgb(0,217,231)",
    });
  }
*/
  // if (results.faceLandmarks) {
  //   drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION, {
  //     color: "#C0C0C070",
  //     lineWidth: 1,
  //   });
  // }

  canvasCtx.restore();
};
