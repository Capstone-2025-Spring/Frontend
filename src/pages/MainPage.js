import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(to bottom, #f0f4f8, #d9e2ec)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    marginBottom: "2rem",
    color: "#333",
  };

  const buttonStyle = {
    padding: "1rem 2rem",
    margin: "0.5rem",
    fontSize: "1.2rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  };

  const hoverButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#4338ca",
  };

  // 간단한 hover 효과 구현
  const [hoveredButton, setHoveredButton] = React.useState(null);

  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>시작하기</h1>
      <button
        style={hoveredButton === "start" ? hoverButtonStyle : buttonStyle}
        onMouseEnter={() => setHoveredButton("start")}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={() => navigate("/checkMedia")}
      >
        모의 면접 시작
      </button>
      <button
        style={hoveredButton === "write" ? hoverButtonStyle : buttonStyle}
        onMouseEnter={() => setHoveredButton("write")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        Login/Sign(현재 미구현 상태)
      </button>
      {/* 채용 일정 및 최신 뉴스 컴포넌트 추가 */}
    </div>
  );
};

export default MainPage;
