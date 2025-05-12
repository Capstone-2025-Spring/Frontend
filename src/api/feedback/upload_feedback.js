// /api/lecture/get_feedback.js

import axios from "axios";
import { useAudioStore } from "../../store/audio_store";
import { useConfigStore } from "../../store/config_store";
import { useWebcam2Store } from "../../store/webcam2_store";

/**
 * recordedAudioBlob이 존재할 때까지 대기
 */
const waitForRecordedAudioBlob = () =>
  new Promise((resolve) => {
    const check = () => {
      const blob = useAudioStore.getState().recordedAudioBlob;
      if (blob) resolve(blob);
      else setTimeout(check, 200); // 200ms 간격으로 확인
    };
    check();
  });
/**
 * Holistic + Config + MP3를 함께 전송해 GPT 평가를 요청
 * 상태에서 직접 recordedAudioBlob과 holisticData를 가져옴
 * @returns {Promise<string>} GPT 평가 결과
 */
export const getLectureFeedbackWithAllData = async () => {
  const { processedHolisticData } = useWebcam2Store.getState();
  const { user_options } = useConfigStore.getState();

  if (!processedHolisticData) {
    throw new Error("❌ processedHolisticData is missing");
  }
  // 🔁 recordedAudioBlob이 준비될 때까지 기다림
  const recordedAudioBlob = await waitForRecordedAudioBlob();

  try {
    // 💾 각각 Blob으로 변환
    const holisticFile = new Blob([JSON.stringify(processedHolisticData)], {
      type: "application/json",
    });

    const configFile = new Blob([JSON.stringify(user_options)], {
      type: "application/json",
    });

    const formData = new FormData();
    formData.append("file", recordedAudioBlob, "lecture.mp3");
    formData.append("holistic", holisticFile, "pose_data.json");
    formData.append("config", configFile, "config.json");

    const response = await axios.post("/api/lecture/feedback/mp3", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("🎯 GPT 평가 결과:", response.data.result);
    return response.data.result;
  } catch (err) {
    console.error("❌ 평가 요청 실패:", err.response?.data || err.message);
    throw err;
  }
};
