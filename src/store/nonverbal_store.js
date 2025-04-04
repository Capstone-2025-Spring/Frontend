// src/store/nonverbal_store.js
import { create } from "zustand";

export const useNonverbalStore = create((set, get) => ({
  issueLog: [],
  currentIssues: {},
  frameIndex: 0,

  // FPS는 현재 이곳에서 직접 사용되진 않지만, 필요 시 외부에서 활용 가능
  FPS: 5,

  TIME_THRESHOLD: {
    elementary: { D1: 7, D2: 15, D3: 5, D4: 5, D5: 15, D6: 10, D7: 7, D8: 15 },
    middle: { D1: 12, D2: 20, D3: 10, D4: 8, D5: 20, D6: 12, D7: 12, D8: 25 },
    college: { D1: 20, D2: 25, D3: 15, D4: 10, D5: 25, D6: 15, D7: 17, D8: 35 },
  },

  incrementFrame: () => {
    set((state) => ({ frameIndex: state.frameIndex + 1 }));
  },

  resetDetection: () => {
    set({
      issueLog: [],
      currentIssues: {},
      frameIndex: 0,
    });
  },

  addIssue: (issue) => {
    set((state) => ({
      issueLog: [...state.issueLog, issue],
    }));
  },

  updateCurrentIssue: (code, data) => {
    set((state) => ({
      currentIssues: {
        ...state.currentIssues,
        [code]: data,
      },
    }));
  },

  removeCurrentIssue: (code) => {
    const updated = { ...get().currentIssues };
    delete updated[code];
    set({ currentIssues: updated });
  },

  getIssues: () => {
    return get().issueLog;
  },
}));
