import axios from "axios";

export const fetchEvaluatorData = async (type) => {
  const res = await axios.get(`/api/admin/prompt/${type}`);
  console.log(res.data);
  return res.data; // { prompt: "...", criteria: [...] }
};

export const updateEvaluator = async (id, payload) => {
  const res = await axios.put(`/api/admin/prompt/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const runEvaluation = async (type, payload) => {
  const res = await axios.post(`/api/admin/prompt/${type}/run`, payload);
  return res.data; // { output: "..." }
};

//Criteria
// 1. 특정 타입 기준 목록 가져오기
export const fetchCriteriaByType = async (type) => {
  const res = await axios.get(`/api/admin/criteria/${type}`);
  console.log(res.data);
  return res.data;
};

// 2. 기준 생성
export const createCriterion = async (payload) => {
  const res = await axios.post(`/api/admin/criteria`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

// 3. 기준 수정
export const updateCriterion = async (id, payload) => {
  const res = await axios.put(`/api/admin/criteria/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

// 4. 기준 삭제
export const deleteCriterion = async (id) => {
  const res = await axios.delete(`/api/admin/criteria/${id}`);
  return res.data;
};
