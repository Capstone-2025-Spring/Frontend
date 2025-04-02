import { create } from "zustand";

// JSON 파일 로드 함수
const loadConfigFromJson = async () => {
  const response = await fetch("/config/pipeline_config.json"); // 경로는 백엔드가 아니라 public에 있어야 하므로 경로 맞게 설정
  const data = await response.json();
  return data;
};

export const useLLMPipelineStore = create((set) => ({
  config: null, // 처음에는 null로 설정, 로딩 후에 채워짐

  // JSON 파일 로드 후 config 설정
  loadConfig: async () => {
    const configData = await loadConfigFromJson(); // JSON 로드
    set({ config: configData });
  },

  // 프롬프트 업데이트
  updatePrompt: (id, prompt) => {
    set((state) => ({
      config: {
        ...state.config,
        modules: state.config.modules.map((mod) =>
          mod.id === id ? { ...mod, prompt } : mod
        ),
      },
    }));
  },

  // 특정 모듈 업데이트 (input, output, criteria 등)
  updateModule: (id, updatedFields) => {
    set((state) => ({
      config: {
        ...state.config,
        modules: state.config.modules.map((mod) =>
          mod.id === id ? { ...mod, ...updatedFields } : mod
        ),
      },
    }));
  },

  // 위치 포함된 전체 config를 저장하기 위한 함수
  getUpdatedConfig: (positions) => {
    const { config } = useLLMPipelineStore.getState();
    const updatedModules = config.modules.map((mod) => ({
      ...mod,
      position: positions[mod.id] || { x: 0, y: 0 }, // 위치 덧붙이기
    }));
    return { ...config, modules: updatedModules };
  },
}));
