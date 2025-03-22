import React from "react";
import CounterContainer from "./container/CounterContainer";

import WebcamContainer from "./container/WebcamContainer";

const App = () => {
  return (
    <div>
      <h1>Redux-Saga Counter</h1>
      {/* <CounterContainer /> */}
      <WebcamContainer />
    </div>
  );
};

export default App;
