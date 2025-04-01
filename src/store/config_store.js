import { create } from "zustand";

export const useConfigStore = create((set) => ({
  // 초기 상태
  user_options: {
    category: "",
    school_level: "",
    subject: "영어",
    age_group: "11",
    class_size: "일반",
    student_type: "조용한 반",
    user_criteria: [],
    difficulty: 1,
    audio_enabled: false,
    video_enabled: false,
    pdf_file: null,
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
