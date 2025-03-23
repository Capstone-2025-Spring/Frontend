import React from "react";

// sample HTML 코드 따온 것

const Webcam = ({ enableWebcam, isWebcamRunning, videoRef, canvasRef }) => {
  return (
    <div>
      <button onClick={enableWebcam} disabled={isWebcamRunning}>
        {isWebcamRunning ? "웹캠 실행 중" : "웹캠 켜기"}
      </button>

      <div style={{ position: "relative", width: "1280px", height: "720px" }}>
        <video
          ref={videoRef}
          style={{
            width: "1280px",
            height: "720px",
            position: "absolute",
            zIndex: 1,
          }}
          autoPlay
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
};

export default Webcam;
