import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementAsync,
} from "../module/slice/counter_slice";
import Counter from "../component/Counter";

// useSelector, useDispatch를 사용해 스토어에서 데이터와 함수를 불러오는 파일입니다
// UI를 건들이지 않습니다 Props를 통해 Component/Counter.js 로 파라미터 형태로 값/함수를 넘깁니다
const CounterContainer = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Counter
      count={count}
      onIncrement={() => dispatch(increment())}
      onDecrement={() => dispatch(decrement())}
      onIncrementAsync={() => dispatch(incrementAsync())}
    />
  );
};

export default CounterContainer;
