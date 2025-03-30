import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [category, setCategory] = useState("");
  const [schoolLevel, setSchoolLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [answerTime, setAnswerTime] = useState(60);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [pdfFile, setPdfFile] = useState(null); // ✅ PDF 파일 상태 추가

  const navigate = useNavigate();

  const handleStartInterview = () => {
    const settings = {
      category,
      schoolLevel,
      subject,
      questionCount,
      answerTime,
      audioEnabled,
      videoEnabled,
      pdfFile, // ✅ 파일도 함께 저장 (선택)
    };

    console.log("설정된 값:", settings);
    navigate("/recording", { state: settings });
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("PDF 파일만 업로드 가능합니다.");
    }
  };

  // 스타일 정의는 그대로 유지
  const containerStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    fontSize: "1.8rem",
    textAlign: "center",
    marginBottom: "2rem",
    color: "#333",
  };

  const formGroupStyle = {
    marginBottom: "1.5rem",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "600",
    color: "#555",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };

  const checkboxStyle = {
    marginRight: "0.5rem",
  };

  const buttonStyle = {
    width: "100%",
    padding: "1rem",
    fontSize: "1.1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Setting</h2>

      {/* 제목 */}
      <div style={formGroupStyle}>
        <label style={labelStyle}>이번 연습 제목</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="예: 2025-03-01 초등 수학 3학년 강의 연습"
          style={inputStyle}
        />
      </div>

      {/* 수업 시연 대상 */}
      <div style={formGroupStyle}>
        <label style={labelStyle}>수업 시연 대상</label>
        <select
          value={schoolLevel}
          onChange={(e) => setSchoolLevel(e.target.value)}
          style={inputStyle}
        >
          <option value="">선택하세요</option>
          <option value="초등학교">초등학교</option>
          <option value="중학교">중학교</option>
          <option value="고등학교">고등학교</option>
        </select>
      </div>

      {/* 과목 */}
      <div style={formGroupStyle}>
        <label style={labelStyle}>과목</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={inputStyle}
        >
          <option value="">선택하세요</option>
          <option value="수학">수학</option>
          <option value="영어">영어</option>
          <option value="과학">과학</option>
          <option value="국어">국어</option>
        </select>
      </div>

      {/* PDF 업로드 */}
      <div style={formGroupStyle}>
        <label style={labelStyle}>참고용 수업자료 (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handlePdfUpload}
          style={inputStyle}
        />
        {pdfFile && (
          <p style={{ marginTop: "0.5rem", color: "#333" }}>
            선택된 파일: {pdfFile.name}
          </p>
        )}
      </div>

      {/* 오디오 / 비디오 설정 */}
      <div style={formGroupStyle}>
        <label style={labelStyle}>
          <input
            type="checkbox"
            checked={audioEnabled}
            onChange={(e) => setAudioEnabled(e.target.checked)}
            style={checkboxStyle}
          />
          오디오 녹음 활성화
        </label>
        <label style={labelStyle}>
          <input
            type="checkbox"
            checked={videoEnabled}
            onChange={(e) => setVideoEnabled(e.target.checked)}
            style={checkboxStyle}
          />
          비디오 녹화 활성화
        </label>
      </div>

      {/* 시작 버튼 */}
      <button style={buttonStyle} onClick={handleStartInterview}>
        수업 시작
      </button>
    </div>
  );
};

export default SettingsPage;
