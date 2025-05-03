import axios from "axios";

// Holistic 데이터를 서버로 전송하는 함수
export const preprocessHolisticData = async (data) => {
  try {
    const response = await axios.post("/api/holisticPreprocess", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 서버 응답 데이터 출력
    console.log(response.data);

    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error("Error processing holistic data:", error);
    throw error; // 오류 발생 시 상위에서 처리할 수 있도록 throw
  }
};
