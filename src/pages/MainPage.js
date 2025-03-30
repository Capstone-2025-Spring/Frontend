import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const containerStyle = {
    minHeight: "100vh",
    background: "#ffffff", // 배경 흰색
    padding: "3rem 1rem",
    color: "#1e3a8a", // 텍스트 파란색
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const sloganStyle = {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    textAlign: "center",
    lineHeight: 1.5,
    color: "#1e3a8a", // 짙은 파랑
  };

  const cardStyle = {
    backgroundColor: "#f0f4ff", // 연한 파란 배경
    color: "#1e40af", // 카드 내부 글씨 파란색
    borderRadius: "16px",
    padding: "2rem",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    marginBottom: "2rem",
    textAlign: "center",
  };

  const cardTitle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  };

  const cardText = {
    marginBottom: "1rem",
    color: "#374151", // 약간 진한 회색
  };

  const buttonStyle = {
    padding: "1rem 2rem",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#3b82f6", // 파란 버튼
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    margin: "0.5rem 0",
    width: "100%",
    transition: "all 0.2s ease-in-out",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#93c5fd", // 연한 파랑
    color: "#1e3a8a",
  };

  return (
    <div style={containerStyle}>
      <div style={sloganStyle}>
        오늘도 한다면 한다! <br />
        자신감 있는 강의!!🔥
      </div>

      <div style={cardStyle}>
        <div style={cardTitle}>수업 하러가기 👍</div>
        <div style={cardText}>
          강의력에 자신이 없으세요? <br />
        </div>
        <button style={buttonStyle} onClick={() => navigate("/checkMedia")}>
          수업 하러가기
        </button>
        <button
          style={secondaryButtonStyle}
          onClick={() => navigate("/question")}
        >
          Login/SignUp (미구현)
        </button>
      </div>
    </div>
  );
};

export default MainPage;
