// src/component/Webcam2.js

const Webcam2 = ({ videoRef, canvasRef }) => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "100%", // 보여지는 화면용 (미리보기용 크기)
          height: "100%",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default Webcam2;
