// api/recommendation/criteria_recommand.js
import axios from "axios";

/**
 * 사용자 메시지를 GPT 추천 API에 보냅니다.
 * @param {string} userMessage
 * @returns {Promise<{reply: string, suggested: string[]}>}
 */
export const requestCriteriaRecommendation = async (userMessage) => {
  try {
    const res = await axios.post("/api/gpt/recommend", {
      message: userMessage,
    });

    return {
      reply: res.data.reply,
      suggested: res.data.suggested || [],
    };
  } catch (error) {
    console.error("GPT 추천 API 실패:", error);
    return {
      reply: "죄송합니다. 추천 중 오류가 발생했어요.",
      suggested: [],
    };
  }
};
