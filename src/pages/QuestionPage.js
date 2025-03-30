import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionPage = () => {
  const [questions, setQuestions] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // 페이지 이동 훅

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!questions.trim()) {
    //   alert("질문을 입력해주세요!");
    //   return;
    // }

    console.log("입력된 질문:", questions);

    // SettingPage로 이동
    navigate("/settings", {
      state: { questions }, // 원한다면 질문 내용 전달 가능
    });
  };

  // 스타일 정의
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9fafb",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const formStyle = {
    width: "90%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  };

  const textareaStyle = {
    width: "100%",
    height: "150px",
    padding: "1rem",
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
    backgroundColor: "#10b981", // emerald-500
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h1>임시 페이지</h1>
        <textarea
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
          placeholder="질문을 입력하세요."
          style={textareaStyle}
        />
        <button
          type="submit"
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
      </form>
    </div>
  );
};

export default QuestionPage;
