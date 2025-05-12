import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckMediaPage = () => {
  const videoRef = useRef(null);
  const [micVolume, setMicVolume] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎛️ 장치 테스트</h2>

        {error ? (
          <p style={styles.error}>{error}</p>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={styles.video}
            />

            <div style={styles.micContainer}>
              <p style={styles.label}>🎙️ 마이크 볼륨</p>
              <div style={styles.micTrack}>
                <div
                  style={{
                    ...styles.micBar,
                    width: `${micVolume * 2}px`,
                  }}
                ></div>
              </div>
            </div>

            <button style={styles.button} onClick={() => navigate("/questions")}>
              다음으로
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to top right, #e0e7ff, #fff, #ffd6e0)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(12px)",
    borderRadius: "20px",
    padding: "2rem",
    width: "100%",
    maxWidth: "520px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    textAlign: "center",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: "bold",
    color: "#9b1c44",
    marginBottom: "1.5rem",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
  video: {
    width: "100%",
    maxWidth: "480px",
    height: "auto",
    borderRadius: "12px",
    backgroundColor: "#000",
    marginBottom: "1rem",
  },
  micContainer: {
    marginBottom: "1.5rem",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "0.3rem",
    color: "#333",
  },
  micTrack: {
    width: "200px",
    height: "20px",
    backgroundColor: "#e5e7eb",
    borderRadius: "6px",
    margin: "0 auto",
  },
  micBar: {
    height: "100%",
    backgroundColor: "#10b981",
    borderRadius: "6px",
    transition: "width 0.2s ease",
  },
  button: {
    marginTop: "1.5rem",
    padding: "0.9rem 1.2rem",
    background: "linear-gradient(to right, #ec4899, #d946ef)",
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "320px",
  },
};

export default CheckMediaPage;
