import React from "react";

const Webcam2 = ({ videoRef, canvasRef }) => {
  return (
    <div>
      <div style={{ position: "relative" }}>
        <video
          ref={videoRef}
          className="input_video"
          style={{ display: "none" }}
          playsInline
        />
        <canvas
          ref={canvasRef}
          className="output_canvas"
          width={640}
          height={360}
        ></canvas>
      </div>
    </div>
  );
};

export default Webcam2;
