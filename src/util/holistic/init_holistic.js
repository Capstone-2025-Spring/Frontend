import {
  Holistic,
  // Results,
  // POSE_CONNECTIONS,
  // HAND_CONNECTIONS,
  // FACEMESH_TESSELATION,
} from "@mediapipe/holistic";

export const initializeHolistic = async () => {
  const holistic = new Holistic({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
  });

  return holistic;
};
