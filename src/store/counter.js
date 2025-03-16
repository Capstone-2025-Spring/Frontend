import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useCounterStore = create(
  devtools(
    persist(
      (set, get) => ({
        count: 0,

        // 동기 액션 (Redux DevTools에서 payload 포함)
        increment: () =>
          set((state) => ({ count: state.count + 1 }), false, {
            type: "counter/increment",
          }),
        decrement: () =>
          set((state) => ({ count: state.count - 1 }), false, {
            type: "counter/decrement",
          }),
        incrementByPayload: (payload) =>
          set((state) => ({ count: state.count + payload }), false, {
            type: "counter/incrementByPayload",
          }),
        returnIncredCurrentValue: () => {
          const CurrentValue = get().count; // 현재 count 값 저장

          set((state) => ({ count: state.count + 1 }), false, {
            type: "counter/returnIncredCurrentValue",
            value: CurrentValue, // Redux DevTools에서 확인 가능
          });

          return CurrentValue; // 함수 실행 시 value 값 반환
        },
        // 비동기 액션 (Redux DevTools에서 payload 포함)
        incrementAsync: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          set((state) => ({ count: state.count + 1 }), false, {
            type: "counter/incrementAsync",
          });
        },
      }),
      { name: "counter-storage" }
    ),
    { name: "CounterStore" }
  )
);
