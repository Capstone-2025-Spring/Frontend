import { useCounterStore } from "../store/counter";
import Counter from "../component/Counter";

const CounterContainer = () => {
  const {
    count,
    increment,
    decrement,
    incrementByPayload,
    returnIncredCurrentValue,
    incrementAsync,
  } = useCounterStore();

  return (
    <Counter
      count={count}
      onIncrement={increment}
      onDecrement={decrement}
      onIncrementByPayload={incrementByPayload}
      returnIncredCurrentValue={returnIncredCurrentValue}
      onIncrementAsync={incrementAsync}
    />
  );
};

export default CounterContainer;
