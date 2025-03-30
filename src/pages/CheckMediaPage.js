import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 추가

const CheckMediaPage = () => {
  const videoRef = useRef(null);
  const [micVolume, setMicVolume] = useState(0);
  const [error, setError] = useState("");

  //1회성이라 store로 상태 관리 안함

  const navigate = useNavigate(); // ✅ 라우터 이동 함수

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const draw = () => {
          analyser.getByteFrequencyData(dataArray);
          const volume =
            dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          setMicVolume(Math.floor(volume));
          requestAnimationFrame(draw);
        };

        draw();
      })
      .catch((err) => {
        console.error("Media access error:", err);
        setError("카메라 또는 마이크 접근이 거부되었습니다.");
      });
  }, []);

  // ✅ 스타일
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    fontFamily: "sans-serif",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
  };

  const videoStyle = {
    width: "480px",
    height: "360px",
    backgroundColor: "#000",
    borderRadius: "8px",
    marginBottom: "1rem",
  };

  const micBarStyle = {
    width: `${micVolume * 2}px`,
    height: "20px",
    backgroundColor: "#10b981",
    borderRadius: "4px",
    transition: "width 0.2s ease",
  };

  const buttonStyle = {
    marginTop: "2rem",
    padding: "1rem 2rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h2>🎛️ 장치 테스트</h2>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <video ref={videoRef} autoPlay playsInline muted style={videoStyle} />
          <div>
            <p>🎙️ 마이크 볼륨</p>
            <div
              style={{
                width: "200px",
                backgroundColor: "#e5e7eb",
                borderRadius: "4px",
              }}
            >
              <div style={micBarStyle}></div>
            </div>
          </div>

          {/* ✅ 다음으로 버튼 */}
          <button style={buttonStyle} onClick={() => navigate("/questions")}>
            다음으로
          </button>
        </>
      )}
    </div>
  );
};

export default CheckMediaPage;
