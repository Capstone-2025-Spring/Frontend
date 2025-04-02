import React, { useEffect, useState } from "react";

const PromptEditor = ({
  config,
  updatePrompt,
  updateModule,
  getUpdatedConfig,
}) => {
  useEffect(() => {
    console.log("Config 초기 상태:", config);
  }, []);

  const [prompts, setPrompts] = useState({
    lecture: "강의 수행 프롬프트를 입력하세요...",
    multimodal: "멀티모달 분석 프롬프트를 입력하세요...",
    rubric: "사용자 기준 선택 (루브릭 설정) 프롬프트를 입력하세요...",
    llm: "LLM 평가 시스템 진입 프롬프트를 입력하세요...",
  });

  const handleChange = (key, value) => {
    setPrompts((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("저장된 프롬프트:", prompts);
    alert("프롬프트가 저장되었습니다 ✅");
    // TODO: 여기서 API 호출로 백엔드에 저장 가능
  };

  const sectionStyle = {
    marginBottom: "1.5rem",
  };

  const labelStyle = {
    fontWeight: "600",
    marginBottom: "0.5rem",
    display: "block",
  };

  const textareaStyle = {
    width: "100%",
    height: "100px",
    padding: "0.8rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };

  const buttonStyle = {
    padding: "0.8rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ marginBottom: "1.5rem" }}>✏️ 프롬프트 설정</h2>

      <div style={sectionStyle}>
        <label style={labelStyle}>1️⃣ 강의 수행</label>
        <textarea
          style={textareaStyle}
          value={prompts.lecture}
          onChange={(e) => handleChange("lecture", e.target.value)}
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>
          2️⃣ 멀티모달 분석 (SST + Holistic + Voice)
        </label>
        <textarea
          style={textareaStyle}
          value={prompts.multimodal}
          onChange={(e) => handleChange("multimodal", e.target.value)}
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>3️⃣ 사용자 기준 선택 (루브릭 설정)</label>
        <textarea
          style={textareaStyle}
          value={prompts.rubric}
          onChange={(e) => handleChange("rubric", e.target.value)}
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>4️⃣ LLM 평가 시스템 진입</label>
        <textarea
          style={textareaStyle}
          value={prompts.llm}
          onChange={(e) => handleChange("llm", e.target.value)}
        />
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button style={buttonStyle} onClick={handleSave}>
          💾 저장하기
        </button>
      </div>
    </div>
  );
};

export default PromptEditor;
