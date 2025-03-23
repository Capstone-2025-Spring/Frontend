// src/api/poseLandmarkerPreprocess.js
import axios from "axios";

export const preprocessPoseLandmarkerData = async (data) => {
  try {
    const response = await axios.post("/api/poseLandmarkerPreprocess", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 서버 응답 데이터 출력
    console.log(response.data);

    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error("Error processing pose landmarker data:", error);
    throw error; // 오류 발생 시 오류를 던져 호출한 곳에서 처리
  }
};
