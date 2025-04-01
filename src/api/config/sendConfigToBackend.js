import axios from "axios";
import { useConfigStore } from "../../store/config_store";

export const sendConfigToBackend = async () => {
  const { user_options } = useConfigStore.getState();

  try {
    const res = await axios.post("/api/upload-config", user_options, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ 설정 전송 성공:", res.data);
  } catch (err) {
    console.error("❌ 설정 전송 실패:", err.response?.data || err.message);
  }
};
