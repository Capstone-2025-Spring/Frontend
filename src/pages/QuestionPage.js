import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionPage = () => {
  const [questions, setQuestions] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    console.log("입력된 질문:", questions);
    navigate("/settings", { state: { questions } });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📌 서비스 이용 시 주의사항</h2>
        <div style={styles.notice}>
          <p>1. 본 서비스는 면접 녹화 및 음성 분석 기능을 포함하고 있습니다.</p>
          <p>
            2. 수집된 데이터는 분석 및 리포트 생성에만 사용되며, 외부로 유출되지
            않습니다.
          </p>
          <p>
            3. 음성 및 영상 녹화 시 개인정보가 포함되지 않도록 주의해주세요.
          </p>
          <p>4. 분석 결과는 참고용이며, 실제 면접 결과와 다를 수 있습니다.</p>
        </div>

        <textarea
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
          placeholder="궁금한 질문을 여기에 적어주세요."
          style={styles.textarea}
        />

        <button style={styles.button} onClick={handleNext}>
          다음
        </button>
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
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  },
  title: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "#9b1c44",
    marginBottom: "1rem",
  },
  notice: {
    fontSize: "1rem",
    color: "#333",
    lineHeight: "1.6",
    marginBottom: "1.5rem",
  },
  textarea: {
    width: "100%",
    height: "150px",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "1px solid #ccc",
    padding: "0.8rem",
    resize: "none",
    marginBottom: "1.5rem",
    fontFamily: "inherit",
  },
  button: {
    width: "100%",
    padding: "1rem",
    fontSize: "1rem",
    fontWeight: "bold",
    background: "linear-gradient(to right, #ec4899, #d946ef)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  },
};

export default QuestionPage;
