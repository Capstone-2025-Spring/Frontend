import { create } from "zustand";

export const useConfigStore = create((set) => ({
  // 초기 상태
  user_options: {
    title: "",
    audience_group: "",
    audience_type: "",
    subject: "",
    user_criteria: [],
    audio_enabled: true,
    video_enabled: true,
  },

  // 전체 옵션 한번에 설정
  set_user_options: (options) => set({ user_options: options }),

  // 특정 옵션만 부분 업데이트
  update_user_option: (key, value) =>
    set((state) => ({
      user_options: {
        ...state.user_options,
        [key]: value,
      },
    })),

  // 기본 설정 JSON 불러오기
  load_user_options_from_file: async () => {
    try {
      const res = await fetch("/config/default_user_config.json");
      const data = await res.json();
      set({ user_options: data });
    } catch (err) {
      console.error("❌ config 불러오기 실패:", err);
    }
  },
}));
