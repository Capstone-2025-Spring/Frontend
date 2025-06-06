import { FFmpeg } from "@ffmpeg/ffmpeg";
import { initializeHolistic } from "../holistic/init_holistic";

const ffmpeg = new FFmpeg({
  log: true,
  corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
});

const fetchFile = async (blob) => {
  const buffer = await blob.arrayBuffer();
  return new Uint8Array(buffer);
};

/**
 * mp4 → mp3 오디오 추출
 */
export async function extractAudioFromMp4(mp4File) {
  try {
    if (!ffmpeg.loaded) {
      await ffmpeg.load();
    }

    await ffmpeg.writeFile("input.mp4", await fetchFile(mp4File));

    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-q:a",
      "0",
      "-map",
      "a",
      "output.mp3",
    ]);

    const data = await ffmpeg.readFile("output.mp3");
    console.log("mp4 to mp3 success");
    return new Blob([data.buffer], { type: "audio/mpeg" });
  } catch (err) {
    console.error("❌ extractAudioFromMp4 실패 (상세):", err);
    throw err;
  }
}

/**
 * mp4 → poseLandmarks (MediaPipe Holistic)
 * @param {File} mp4File - 입력 MP4 파일
 * @param {Function} onProgress - (optional) 진행률 콜백 (curFrame, totalFrames)
 * @returns {Promise<Object>} processed pose json
 */
export async function extractHolisticFromMp4(mp4File, onProgress) {
  return new Promise(async (resolve, reject) => {
    try {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(mp4File);
      video.crossOrigin = "anonymous";
      video.muted = true;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const holistic = await initializeHolistic();
      const resultsArray = [];

      // === 설정 ===
      const FPS = 30;
      const FRAME_SKIP = 5;
      const interval = FRAME_SKIP / FPS;

      holistic.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      holistic.onResults((results) => {
        // 변경된 부분: 영상 시간 기준 ms 타임스탬프
        const timestamp = Math.round(video.currentTime * 1000); // 밀리초 변환

        const poseOnly =
          results.poseLandmarks?.map((lm) => ({
            x: lm.x,
            y: lm.y,
            z: lm.z,
            visibility: lm.visibility,
          })) ?? [];

        resultsArray.push({ timestamp, results: poseOnly });
      });

      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const duration = video.duration;
        const totalFrames = Math.floor(duration / interval);
        let currentFrame = 0;

        const captureNext = async () => {
          const currentTime = currentFrame * interval;
          if (currentTime >= duration) {
            resolve({ holisticData: resultsArray });
            return;
          }

          if (onProgress) onProgress(currentFrame, totalFrames);

          video.currentTime = currentTime;
          video.onseeked = async () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            await holistic.send({ image: canvas });
            currentFrame += FRAME_SKIP;
            captureNext();
          };
        };

        captureNext();
      };

      video.onerror = (e) => {
        reject("❌ 비디오 로드 실패: " + e.message);
      };
    } catch (err) {
      console.error("❌ extractHolisticFromMp4 실패:", err);
      reject(err);
    }
  });
}
