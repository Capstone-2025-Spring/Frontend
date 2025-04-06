import axios from "axios";

export const fetchTargetData = async (target_type) => {
  const res = await axios.get(`/api/data/${target_type}`);
  return res.data; // 예: { content: "...", meta: {...} }
};
