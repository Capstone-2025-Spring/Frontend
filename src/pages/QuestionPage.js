import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionPage = () => {
  const [questions, setQuestions] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    console.log("입력된 질문:", questions);
    navigate("/settings", {
      state: { questions },
    });
  };

  // 스타일
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9fafb",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "2rem",
  };

  const boxStyle = {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  };

  const textareaStyle = {
    width: "100%",
    height: "150px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "none",
    marginBottom: "1.5rem",
  };

  const buttonStyle = {
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#10b981",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const noticeStyle = {
    fontSize: "0.95rem",
    lineHeight: "1.6",
    color: "#444",
    marginBottom: "2rem",
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2 style={{ marginBottom: "1rem" }}>📌 서비스 이용 시 주의사항</h2>
        <div style={noticeStyle}>
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
          placeholder="빈 텍스트 공간"
          style={textareaStyle}
        />

        <button
          onClick={handleNext}
          style={{
            ...buttonStyle,
            backgroundColor: isHovered
              ? "#059669"
              : buttonStyle.backgroundColor,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
