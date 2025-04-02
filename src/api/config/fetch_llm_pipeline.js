import axios from "axios";

// JSON 파일을 백엔드로 저장하는 함수
export const saveLLMPipelineConfig = async (newConfig) => {
  try {
    const response = await axios.post("/save-config", newConfig, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("✅ 저장됨", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 저장 실패", error);
    throw error; // 오류 발생 시 처리
  }
};
