import React from "react";
import CounterContainer from "./container/CounterContainer";
import WebcamContainer from "./container/WebcamContainer";

import Webcam2 from "./component/Webcam2";

const App = () => {
  return (
    <div>
      <h1>Zustand 기반 Counter</h1>
      <CounterContainer />
      <WebcamContainer />
      {/* <Webcam2 /> */}
    </div>
  );
};
export default App;
