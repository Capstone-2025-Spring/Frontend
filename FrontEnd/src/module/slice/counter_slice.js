import { createSlice } from "@reduxjs/toolkit";

// Redux에서 관리할 Counter 상태를 정의합니다.
//사용할 변수는 initialState에 넣어서 사용하고,
//각 액션을 정의, 구현합니다.
//액션은 함수라고 보면 됩니다다
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementAsync: (state) => {
      // Redux-Saga에서 처리할 액션.
      // 추후 비동기 처리 (API 호출 등에 사용할 예정)
    },
  },
});

//아래서 리듀서와 액션을 export해줍니다
export const { increment, decrement, incrementAsync } = counterSlice.actions;
export default counterSlice.reducer;
