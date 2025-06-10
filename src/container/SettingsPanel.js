import { useEffect } from "react";
import UserCriteriaSelector from "../component/UserCriteriaContainer"; // 상단 import
import "../css/SettingsPanel.css";
import { useConfigStore } from "../store/config_store";

const SettingsPanel = () => {
  const { user_options, update_user_option, load_user_options_from_file } =
    useConfigStore();

  useEffect(() => {
    load_user_options_from_file();
  }, []);
  /*
  useEffect(() => {
    console.log(user_options);
  }, [user_options]);
  
     <div className="settings-section">
        <label className="settings-label">학급 크기</label>
        <select
          value={user_options.class_size}
          onChange={(e) => update_user_option("class_size", e.target.value)}
          className="settings-select"
        >
          <option value="">선택</option>
          <option value="소규모">소규모</option>
          <option value="일반">일반</option>
          <option value="대규모">대규모</option>
        </select>
      </div>

      <div className="settings-section">
        <label className="settings-label">학생 나이</label>
        <input
          type="number"
          value={user_options.age_group}
          onChange={(e) => update_user_option("age_group", e.target.value)}
          className="settings-input"
        />
      </div>
  
   <div className="settings-section">
        <label className="settings-label">PDF 수업자료 업로드</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => handlePdfUploadWithValidation(e, update_user_option)}
          className="settings-input"
        />
        {user_options.pdf_file && (
          <p className="settings-pdf-file">📎 {user_options.pdf_file.name}</p>
        )}
      </div>
  */
  return (
    <div className="settings-panel">
      <h3>🛠 설정 패널</h3>

      <div className="settings-section">
        <label className="settings-label">연습 제목</label>
        <input
          type="text"
          value={user_options.title}
          onChange={(e) => update_user_option("title", e.target.value)}
          className="settings-input"
        />
      </div>

      <div className="settings-section">
        <label className="settings-label">강의대상</label>
        <select
          value={user_options.audience_group}
          onChange={(e) => update_user_option("audience_group", e.target.value)}
          className="settings-select"
        >
          <option value="">선택</option>
          <option value="초등학교">초등학교</option>
          <option value="중학교">중학교</option>
          <option value="고등학교">고등학교</option>
          <option value="성인">성인</option>
          <option value="고령자">고령자</option>
        </select>
      </div>

      <div className="settings-section">
        <label className="settings-label">강의 목표</label>
        <input
          //type="number"
          value={user_options.subject}
          onChange={(e) => update_user_option("subject", e.target.value)}
          className="settings-input"
        />
      </div>

      <div className="settings-section">
        <label className="settings-label">학생 유형</label>
        <select
          value={user_options.audience_type}
          onChange={(e) => update_user_option("audience_type", e.target.value)}
          className="settings-select"
        >
          <option value="">선택</option>
          <option value="조용함">조용함</option>
          <option value="예의가 필요함">예의가 필요함</option>
          <option value="질문이 많음">질문이 많음</option>
          <option value="주의가 부산함">주의가 부산함</option>
        </select>
      </div>

      <div>
        <UserCriteriaSelector />
      </div>
      <div className="settings-section">
        <label className="settings-checkbox-label">
          <input
            type="checkbox"
            checked={user_options.audio_enabled}
            onChange={(e) =>
              update_user_option("audio_enabled", e.target.checked)
            }
          />
          오디오 녹음
        </label>
        <label className="settings-checkbox-label">
          <input
            type="checkbox"
            checked={user_options.video_enabled}
            onChange={(e) =>
              update_user_option("video_enabled", e.target.checked)
            }
          />
          비디오 녹화
        </label>
      </div>
    </div>
  );
};

export default SettingsPanel;
