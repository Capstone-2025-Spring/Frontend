import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          오늘도 한다면 한다! <br />
          자신감 있는 강의!!
        </h1>

        <div style={styles.section}>
          <div style={styles.label}>실시간 수업, 평가 하러가기</div>
          <button style={styles.button} onClick={() => navigate("/checkMedia")}>
            수업 하러가기
          </button>
        </div>

        <div style={styles.section}>
          <div style={styles.label}>강의 영상을 업로드하여 평가받기</div>
          <button style={styles.button} onClick={() => navigate("/upload")}>
            영상 업로드하러 가기
          </button>
        </div>
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
    maxWidth: "520px",
    width: "100%",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    textAlign: "center",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    color: "#9b1c44", // 붉은 포인트 컬러
    lineHeight: 1.4,
  },
  section: {
    marginBottom: "1.8rem",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#333",
    marginBottom: "0.6rem",
  },
  button: {
    padding: "0.9rem 1.2rem",
    background: "linear-gradient(to right, #ec4899, #d946ef)", // 핑크~보라
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "400px",
  },
  secondaryButton: {
    padding: "0.9rem 1.2rem",
    backgroundColor: "#f3e8ff", // 연보라
    color: "#7e22ce", // 진보라 텍스트
    fontWeight: "bold",
    fontSize: "1rem",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "400px",
  },
};

export default MainPage;
