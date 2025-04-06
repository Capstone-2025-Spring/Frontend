import axios from "axios";

export const fetchEvaluatorData = async (type) => {
  const res = await axios.get(`/api/evaluator/${type}`);
  return res.data; // { prompt: "...", criteria: [...] }
};

export const updateEvaluator = async (type, payload) => {
  const res = await axios.patch(`/api/evaluator/${type}`, payload);
  return res.data;
};

export const runEvaluation = async (type, payload) => {
  const res = await axios.post(`/api/evaluator/${type}/run`, payload);
  return res.data; // { output: "..." }
};
