// util/webcam/init_webcam.js
export const initWebcam = async (videoElement) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  videoElement.srcObject = stream;
  await videoElement.play();

  return stream;
};
