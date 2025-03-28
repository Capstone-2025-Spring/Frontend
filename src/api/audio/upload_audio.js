// api/audio/upload_audio.js
import axios from "axios";

export const upload_audio = async (blob) => {
  const form_data = new FormData();
  form_data.append("file", blob, "audio.wav");

  try {
    const response = await axios.post("/api/upload-audio", form_data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ 오디오 업로드 완료");
    return response.data;
  } catch (error) {
    console.error("❌ 업로드 실패:", error);
    throw error;
  }
};
