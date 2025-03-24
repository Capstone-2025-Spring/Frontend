import React from "react";

// sample HTML 코드 따온 것

const Webcam = ({
  toggleWebcam,
  isWebcamRunning,
  videoRef,
  canvasRef,
  landmarksData,
}) => {
  return (
    <div>
      {/* 웹캠 켜기/끄기 버튼 */}
      <button onClick={toggleWebcam}>
        {isWebcamRunning ? "웹캠 실행 중/다시누르면 끔" : "웹캠 켜기"}
      </button>

      {/* 웹캠 영상 및 캔버스 */}
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
