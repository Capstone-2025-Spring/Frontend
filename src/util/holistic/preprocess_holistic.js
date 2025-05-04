const generateVideoId = () => {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
    now.getDate()
  )}`;
  const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(
    now.getSeconds()
  )}`;
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `video_${date}_${time}_${random}`;
};
export const preprocessHolisticJson = (rawData) => {
  const videoId = generateVideoId();

  const cleaned = {
    videoId,
    holisticData: rawData.holisticData.map((frame) => ({
      timestamp: frame.timestamp,
      results:
        frame.results?.poseLandmarks?.map((lm) => ({
          x: lm.x,
          y: lm.y,
          z: lm.z,
          visibility: lm.visibility,
        })) ?? [],
    })),
  };

  return cleaned;
};
