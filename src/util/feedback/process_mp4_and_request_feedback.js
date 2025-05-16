// util/feedback/process_mp4_and_request_feedback.js
import axios from "axios";
import { useConfigStore } from "../../store/config_store";
import { useLoaderStore } from "../../store/loader_store"; // ✅ 추가
import {
  extractAudioFromMp4,
  extractHolisticFromMp4,
} from "./extract_from_mp4";

const { updateLoader } = useLoaderStore.getState(); // ✅ 상태 업데이트 함수

/**
 * MP4 파일을 분석하고 GPT 평가를 요청합니다.
 */
export async function processMp4AndRequestFeedback(mp4File) {
  try {
    console.log("🎞️ [START] MP4 분석 시작:", mp4File.name);

    // Step 0: 초기화
    updateLoader({
      current_step: "오디오 추출 중...",
      progress_percent: 5,
      estimated_time: "예상 5초 남음",
    });

    // Step 1: 오디오 추출
    const audioBlob = await extractAudioFromMp4(mp4File);
    console.log("✅ [AUDIO] MP3 추출 완료:", audioBlob);
    updateLoader({
      current_step: "포즈 분석 중...",
      progress_percent: 20,
      estimated_time: "예상 10~20초 남음",
    });

    // Step 2: 포즈 데이터 추출 (프레임 단위 진행률 콜백)
    const holisticJson = await extractHolisticFromMp4(mp4File, (cur, total) => {
      const percent = 20 + Math.floor((cur / total) * 60); // 20~80%
      updateLoader({
        progress_percent: percent,
        estimated_time: `프레임 ${cur}/${total}`,
      });
    });
    console.log("✅ [POSE] Holistic JSON 추출 완료");

    // Step 3: config 가져오기
    updateLoader({
      current_step: "설정 정보 처리 중...",
      progress_percent: 82,
      estimated_time: "1초 이내",
    });
    const { user_options } = useConfigStore.getState();
    const configFile = new Blob([JSON.stringify(user_options)], {
      type: "application/json",
    });

    // Step 4: FormData 구성
    const formData = new FormData();
    formData.append("file", audioBlob, "lecture.mp3");
    formData.append(
      "holistic",
      new Blob([JSON.stringify(holisticJson)], { type: "application/json" }),
      "pose_data.json"
    );
    formData.append("config", configFile, "config.json");

    updateLoader({
      current_step: "GPT 평가 요청 중...",
      progress_percent: 90,
      estimated_time: "서버 응답 대기 중",
    });

    // Step 5: API 요청
    const response = await axios.post("/api/lecture/feedback/mp3", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    updateLoader({
      current_step: "완료!",
      progress_percent: 100,
      estimated_time: null,
    });

    console.log("✅ [SUCCESS] GPT 응답 수신 완료");
    console.log("🎯 [RESULT]:", response.data);
    return response.data;
  } catch (err) {
    console.error("❌ processMp4AndRequestFeedback 실패:", err);
    updateLoader({
      current_step: "❌ 오류 발생",
      estimated_time: "잠시 후 다시 시도해주세요",
    });
    throw err;
  }
}
