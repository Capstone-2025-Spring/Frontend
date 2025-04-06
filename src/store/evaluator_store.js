import { create } from "zustand";
import { devtools } from "zustand/middleware";

const STORE_NAME = "AppStore";

const useAppStore = create(
  devtools(
    (set) => ({
      // === Evaluator 관련 상태 ===
      active_evaluator: "COT",
      prompt: "",
      criteria: [],
      output: "",
      eval_loading: false,
      eval_error: null,

      setActiveEvaluator: (type) =>
        set(
          { active_evaluator: type },
          false,
          `${STORE_NAME}/setActiveEvaluator`
        ),

      setPrompt: (prompt) => set({ prompt }, false, `${STORE_NAME}/setPrompt`),

      setCriteria: (criteria) =>
        set({ criteria }, false, `${STORE_NAME}/setCriteria`),

      setOutput: (output) => set({ output }, false, `${STORE_NAME}/setOutput`),

      setEvalLoading: (loading) =>
        set({ eval_loading: loading }, false, `${STORE_NAME}/setEvalLoading`),

      setEvalError: (err) =>
        set({ eval_error: err }, false, `${STORE_NAME}/setEvalError`),

      resetEvaluator: () =>
        set(
          {
            prompt: "",
            criteria: [],
            output: "",
            eval_loading: false,
            eval_error: null,
          },
          false,
          `${STORE_NAME}/resetEvaluator`
        ),

      // === Target 데이터 관련 상태 ===
      active_target: "SST",
      target_data: "",
      data_loading: false,
      data_error: null,

      setActiveTarget: (type) =>
        set({ active_target: type }, false, `${STORE_NAME}/setActiveTarget`),

      setTargetData: (data) =>
        set({ target_data: data }, false, `${STORE_NAME}/setTargetData`),

      setDataLoading: (loading) =>
        set({ data_loading: loading }, false, `${STORE_NAME}/setDataLoading`),

      setDataError: (err) =>
        set({ data_error: err }, false, `${STORE_NAME}/setDataError`),

      resetTarget: () =>
        set(
          {
            target_data: "",
            data_loading: false,
            data_error: null,
          },
          false,
          `${STORE_NAME}/resetTarget`
        ),
    }),
    { name: STORE_NAME }
  )
);

export default useAppStore;
