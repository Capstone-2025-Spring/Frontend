import React, { useEffect } from "react";
import { useConfigStore } from "../store/config_store";
import { handlePdfUploadWithValidation } from "../util/pdf/pdfHandler";

const SettingsPanel = () => {
  const { user_options, update_user_option, load_user_options_from_file } =
    useConfigStore();

  useEffect(() => {
    load_user_options_from_file();
  }, []);

  const section = {
    marginBottom: "1.5rem",
  };

  const label = {
    display: "block",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#333",
  };

  const input = {
    width: "100%",
    padding: "0.6rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "1rem",
  };

  return (
    <div
      style={{
        backgroundColor: "#fefefe",
        padding: "1.5rem",
        marginBottom: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginBottom: "1rem", fontWeight: "bold" }}>🛠 설정 패널</h3>

      <div style={section}>
        <label style={label}>연습 제목</label>
        <input
          type="text"
          value={user_options.category}
          onChange={(e) => update_user_option("category", e.target.value)}
          style={input}
        />
      </div>

      <div style={section}>
        <label style={label}>학교급</label>
        <select
          value={user_options.school_level}
          onChange={(e) => update_user_option("school_level", e.target.value)}
          style={input}
        >
          <option value="">선택</option>
          <option value="초등학교">초등학교</option>
          <option value="중학교">중학교</option>
          <option value="고등학교">고등학교</option>
        </select>
      </div>

      <div style={section}>
        <label style={label}>과목</label>
        <select
          value={user_options.subject}
          onChange={(e) => update_user_option("subject", e.target.value)}
          style={input}
        >
          <option value="">선택</option>
          <option value="수학">수학</option>
          <option value="영어">영어</option>
          <option value="과학">과학</option>
          <option value="국어">국어</option>
        </select>
      </div>

      <div style={section}>
        <label style={label}>학생 나이</label>
        <input
          type="number"
          value={user_options.age_group}
          onChange={(e) => update_user_option("age_group", e.target.value)}
          style={input}
        />
      </div>

      <div style={section}>
        <label style={label}>학급 크기</label>
        <select
          value={user_options.class_size}
          onChange={(e) => update_user_option("class_size", e.target.value)}
          style={input}
        >
          <option value="">선택</option>
          <option value="소규모">소규모</option>
          <option value="일반">일반</option>
          <option value="대규모">대규모</option>
        </select>
      </div>

      <div style={section}>
        <label style={label}>학생 유형</label>
        <select
          value={user_options.student_type}
          onChange={(e) => update_user_option("student_type", e.target.value)}
          style={input}
        >
          <option value="">선택</option>
          <option value="조용한 반">조용한 반</option>
          <option value="시끄러운 반">시끄러운 반</option>
          <option value="질문 많은 반">질문 많은 반</option>
        </select>
      </div>

      <div style={section}>
        <label style={label}>PDF 수업자료 업로드</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => handlePdfUploadWithValidation(e, update_user_option)}
          style={input}
        />
        {user_options.pdf_file && (
          <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
            📎 {user_options.pdf_file.name}
          </p>
        )}
      </div>

      <div style={section}>
        <label>
          <input
            type="checkbox"
            checked={user_options.audio_enabled}
            onChange={(e) =>
              update_user_option("audio_enabled", e.target.checked)
            }
            style={{ marginRight: "0.5rem" }}
          />
          오디오 녹음
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={user_options.video_enabled}
            onChange={(e) =>
              update_user_option("video_enabled", e.target.checked)
            }
            style={{ marginRight: "0.5rem" }}
          />
          비디오 녹화
        </label>
      </div>
    </div>
  );
};

export default SettingsPanel;
