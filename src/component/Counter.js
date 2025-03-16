import React from "react";

//UI는 여기서 다룹니다
const Counter = ({ count, onIncrement, onDecrement, onIncrementAsync }) => {
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <button onClick={onIncrementAsync}>Async + (1초 후 증가)</button>
    </div>
  );
};

export default Counter;
