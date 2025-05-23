import axios from "axios";
import { useAudioStore } from "../../store/audio_store";
import { useConfigStore } from "../../store/config_store";
import { useEventStore } from "../../store/event_store";
import { useWebcam2Store } from "../../store/webcam2_store";

const waitForRecordedAudioBlob = () =>
  new Promise((resolve) => {
    const check = () => {
      const blob = useAudioStore.getState().recordedAudioBlob;
      if (blob) resolve(blob);
      else setTimeout(check, 200);
    };
    check();
  });

export const getLectureFeedbackWithAllData = async () => {
  const { processedHolisticData } = useWebcam2Store.getState();
  const { user_options } = useConfigStore.getState();
  const { results } = useEventStore.getState();

  const recordedAudioBlob = await waitForRecordedAudioBlob();

  if (!processedHolisticData || results.length === 0) {
    throw new Error("❌ 필수 데이터 누락 (pose 또는 eventInfo)");
  }

  const eventInfo = results[results.length - 1].eventInfo;

  try {
    const holisticFile = new Blob([JSON.stringify(processedHolisticData)], {
      type: "application/json",
    });
    const configFile = new Blob([JSON.stringify(user_options)], {
      type: "application/json",
    });
    const eventInfoFile = new Blob([JSON.stringify(eventInfo)], {
      type: "application/json",
    });

    const formData = new FormData();
    formData.append("file", recordedAudioBlob, "lecture.mp3");
    formData.append("holistic", holisticFile, "pose_data.json");
    formData.append("config", configFile, "config.json");
    formData.append("eventInfo", eventInfoFile, "eventInfo.json");

    const response = await axios.post("/api/lecture/feedback/event", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    console.error("❌ 평가 요청 실패:", err.response?.data || err.message);
    throw err;
  }
};
