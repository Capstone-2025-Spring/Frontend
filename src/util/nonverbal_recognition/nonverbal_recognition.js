import { useNonverbalStore } from "../../store/nonverbal_store";

export function NonverbalRecognition(level = "elementary") {
  const {
    issueLog,
    currentIssues,
    frameIndex,
    addIssue,
    incrementFrame,
    updateCurrentIssue,
    removeCurrentIssue,
  } = useNonverbalStore();

  const FPS = 5;
  const TIME_THRESHOLD = {
    elementary: { D1: 7, D2: 15, D3: 5, D4: 5, D5: 15, D6: 10, D7: 7, D8: 15 },
    middle: { D1: 12, D2: 20, D3: 10, D4: 8, D5: 20, D6: 12, D7: 12, D8: 25 },
    college: { D1: 20, D2: 25, D3: 15, D4: 10, D5: 25, D6: 15, D7: 17, D8: 35 },
  };

  function processFrame(landmarks, timeSec) {
    incrementFrame();

    const triggers = {
      D1:
        detectHandOveruse(landmarks.prevLeftHand, landmarks.currLeftHand) ||
        detectHandOveruse(landmarks.prevRightHand, landmarks.currRightHand),
      D2: detectBodySway(landmarks.shoulderXHistory),
      D3:
        detectFaceObstruction(landmarks.leftHand, landmarks.faceCenter) ||
        detectFaceObstruction(landmarks.rightHand, landmarks.faceCenter),
      D4: detectOutOfFrame(landmarks.nose),
      D5: isFacingBack(landmarks.leftShoulder, landmarks.rightShoulder),
      D6: detectSpeakingWhileBack(
        isFacingBack(landmarks.leftShoulder, landmarks.rightShoulder),
        isSpeaking(landmarks.faceLandmarks)
      ),
      D7: detectFoldedArms(
        landmarks.leftHand,
        landmarks.rightHand,
        landmarks.shoulderY
      ),
      D8: detectNoGesture(landmarks.handPositions),
    };

    for (const [code, isActive] of Object.entries(triggers)) {
      const current = currentIssues[code];

      if (isActive) {
        if (!current) {
          updateCurrentIssue(code, { start: timeSec, counter: 1 });
        } else {
          updateCurrentIssue(code, {
            ...current,
            counter: current.counter + 1,
          });
        }
      } else if (current) {
        if (current.counter >= TIME_THRESHOLD[level][code]) {
          const duration = timeSec - current.start;

          console.log(`🚨 동작 감지됨: ${code}`);
          console.log(`⏱️ 시작 시간: ${current.start.toFixed(2)}초`);
          console.log(`⏳ 지속 시간: ${duration.toFixed(2)}초`);
          console.log(`🛑 종료 시간: ${timeSec.toFixed(2)}초`);

          addIssue({
            type: code,
            start: current.start,
            end: timeSec,
            duration: duration,
          });
        }
        removeCurrentIssue(code);
      }
    }
  }

  return {
    processFrame,
    getIssues: () => issueLog,
  };
}

function detectHandOveruse(prev, curr) {
  if (
    !prev ||
    !curr ||
    typeof prev.x !== "number" ||
    typeof prev.y !== "number" ||
    typeof curr.x !== "number" ||
    typeof curr.y !== "number"
  ) {
    console.warn("detectHandOveruse: Invalid input data", { prev, curr });
    return false;
  }
  const dx = curr.x - prev.x;
  const dy = curr.y - prev.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return dist > 0.05;
}

function detectBodySway(xHistory) {
  let reversals = 0;
  for (let i = 2; i < xHistory.length; i++) {
    const prevDiff = xHistory[i - 1] - xHistory[i - 2];
    const currDiff = xHistory[i] - xHistory[i - 1];
    if (prevDiff * currDiff < 0) reversals++;
  }
  return reversals >= 3;
}

function detectFaceObstruction(hand, faceCenter) {
  const dx = hand.x - faceCenter.x;
  const dy = hand.y - faceCenter.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return dist < 0.07;
}

function detectOutOfFrame(landmark) {
  return (
    landmark.x < 0.05 ||
    landmark.x > 0.95 ||
    landmark.y < 0.05 ||
    landmark.y > 0.95
  );
}

function isFacingBack(leftShoulder, rightShoulder) {
  const dz = Math.abs(leftShoulder.z - rightShoulder.z);
  return dz > 0.4 || rightShoulder.x < leftShoulder.x;
}

function isSpeaking(faceLandmarks) {
  const upperLip = faceLandmarks[13];
  const lowerLip = faceLandmarks[14];
  const dy = Math.abs(upperLip.y - lowerLip.y);
  return dy > 0.03;
}

function detectSpeakingWhileBack(facingBack, speaking) {
  return facingBack && speaking;
}

function detectFoldedArms(leftHand, rightHand, shoulderY) {
  const dx = leftHand.x - rightHand.x;
  const dy = leftHand.y - rightHand.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const avgY = (leftHand.y + rightHand.y) / 2;
  return dist < 0.1 && Math.abs(avgY - shoulderY) < 0.1;
}

function detectNoGesture(handPositions) {
  const xs = handPositions.map((p) => p.x);
  const ys = handPositions.map((p) => p.y);
  const variance = (arr) => {
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    return arr.reduce((a, b) => a + (b - avg) ** 2, 0) / arr.length;
  };
  return variance(xs) < 0.001 && variance(ys) < 0.001;
}
