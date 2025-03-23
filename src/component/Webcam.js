import React, { useState } from "react";

// sample HTML 코드 따온 것

const Webcam = ({
  toggleWebcam,
  isWebcamRunning,
  videoRef,
  canvasRef,
  landmarksData,
}) => {
  const [showLandmarks, setShowLandmarks] = useState(false); // 랜드마크 데이터 표시 여부 상태

  const handleToggleWebcam = () => {
    toggleWebcam(); // 웹캠 시작/정지 토글
    if (!isWebcamRunning) {
      setShowLandmarks(false); // 웹캠이 종료되면 랜드마크 데이터 안 보이게
    }
  };

  const handleShowLandmarks = () => {
    setShowLandmarks(true); // 웹캠을 끈 후 랜드마크 데이터 보여주기
  };

  return (
    <div>
      {/* 웹캠 켜기/끄기 버튼 */}
      <button onClick={handleToggleWebcam}>
        {isWebcamRunning ? "웹캠 실행 중/다시누르면 끔끔" : "웹캠 켜기"}
      </button>

      {/* 웹캠 끄기 후 랜드마크 데이터 보여주기 */}
      {!isWebcamRunning && !showLandmarks && (
        <button onClick={handleShowLandmarks}>랜드마크 데이터 보기</button>
      )}

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

      {/* 랜드마크 데이터 표시 */}
      {showLandmarks && (
        <div>
          <h3>랜드마크 데이터</h3>
          <pre>{JSON.stringify(landmarksData, null, 2)}</pre>{" "}
          {/* 랜드마크 데이터 JSON 형식으로 보기 */}
        </div>
      )}
    </div>
  );
};

export default Webcam;
