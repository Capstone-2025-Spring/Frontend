import axios from "axios";

// Holistic 데이터를 전처리 없이 바로 서버로 전송하는 함수
export const upload_holistic_data = async (data) => {
  try {
    const response = await axios.post("/api/upload/holistic", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ 서버 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 전송 실패:", error.response?.data || error.message);
    throw error;
  }
};
