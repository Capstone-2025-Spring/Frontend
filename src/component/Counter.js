import React, { useState } from "react";

const Counter = ({
  count,
  onIncrement,
  onDecrement,
  onIncrementByPayload,
  returnIncredCurrentValue,
  onIncrementAsync,
}) => {
  const [inputValue, setInputValue] = useState(1); // 입력값 상태 추가

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0; // 숫자 변환, 유효하지 않으면 0
    setInputValue(value);
  };

  const handleIncrementByPayload = () => {
    onIncrementByPayload(inputValue); // 입력값만큼 증가
  };

  const handleReturnIncred = () => {
    console.log(returnIncredCurrentValue());
  };

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <button onClick={onIncrementAsync}>Async +1 (1초 후 증가)</button>
      <button onClick={handleReturnIncred}>IncreadButton</button>

      <div>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="숫자를 입력하세요"
        />
        <button onClick={handleIncrementByPayload}>입력값만큼 증가</button>
      </div>
    </div>
  );
};

export default Counter;
