import React, { useState } from "react";

const UnifiedModuleBox = ({
  moduleId,
  title,
  color,
  inputs,
  outputs,
  defaultPrompt,
  criteria,
  reference,
  custom,
  inputRef,
  outputRef,
  onPromptChange,
}) => {
  const [prompt, setPrompt] = useState(defaultPrompt || "");

  const handlePromptChange = (e) => {
    const newVal = e.target.value;
    setPrompt(newVal);
    onPromptChange?.(moduleId, newVal); // 프롬프트 변경 저장
  };

  return (
    <div
      style={{
        ...boxStyle,
        border: `2px solid ${color}`,
        backgroundColor: color + "20",
      }}
    >
      <h4 style={{ marginBottom: "0.5rem" }}>{title}</h4>

      {/* 🔌 포트 */}
      <div ref={inputRef} style={portStyle.input} />
      <div ref={outputRef} style={portStyle.output} />

      {/* 📥 입력 */}
      {inputs?.length > 0 && (
        <div style={sectionStyle}>
          <strong style={labelStyle}>📥 Input</strong>
          <ul style={compactList}>
            {inputs.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 📤 출력 */}
      {outputs?.length > 0 && (
        <div style={sectionStyle}>
          <strong style={labelStyle}>📤 Output</strong>
          <ul style={compactList}>
            {outputs.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ✏️ 프롬프트 */}
      <div style={sectionStyle}>
        <strong style={labelStyle}>✏️ Prompt</strong>
        <textarea
          style={textareaStyle}
          value={prompt}
          onChange={handlePromptChange}
        />
      </div>

      {/* 📌 Criteria */}
      {criteria && (
        <div style={sectionStyle}>
          <strong style={labelStyle}>📌 Criteria</strong>
          <ul style={compactList}>
            {criteria.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 📚 Reference */}
      {reference && (
        <div style={sectionStyle}>
          <strong style={labelStyle}>📚 Reference</strong>
          <ul style={compactList}>
            {reference.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ⚙️ Custom */}
      {custom && (
        <div style={sectionStyle}>
          <strong style={labelStyle}>⚙️ Custom</strong>
          <pre style={customBox}>{JSON.stringify(custom, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

const boxStyle = {
  width: "240px",
  padding: "0.8rem",
  borderRadius: "10px",
  position: "relative",
  backgroundColor: "#fff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
};

const portStyle = {
  input: {
    width: "10px",
    height: "10px",
    backgroundColor: "#10b981",
    borderRadius: "50%",
    position: "absolute",
    top: "8px",
    left: "-14px",
  },
  output: {
    width: "10px",
    height: "10px",
    backgroundColor: "#3b82f6",
    borderRadius: "50%",
    position: "absolute",
    bottom: "8px",
    right: "-14px",
  },
};

const sectionStyle = {
  marginTop: "0.6rem",
};

const labelStyle = {
  display: "block",
  fontSize: "0.8rem",
  fontWeight: 600,
  marginBottom: "0.3rem",
};

const compactList = {
  paddingLeft: "1.2rem",
  fontSize: "0.8rem",
  lineHeight: "1.3",
  margin: 0,
};

const textareaStyle = {
  width: "90%",
  height: "90px",
  borderRadius: "1px",
  border: "1px solid #ccc",
  fontSize: "0.8rem",
  padding: "0.4rem",
  resize: "none",
  backgroundColor: "#fefefe",
};

const customBox = {
  fontSize: "0.75rem",
  backgroundColor: "#f3f4f6",
  padding: "0.5rem",
  borderRadius: "6px",
  overflowX: "auto",
};

export default UnifiedModuleBox;
