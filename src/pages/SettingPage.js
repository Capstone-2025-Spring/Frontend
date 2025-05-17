import { useNavigate } from "react-router-dom";
import SettingsPanel from "../container/SettingsPanel";
import "../css/SettingsPage.css"; // ✅ 스타일 적용
import { useConfigStore } from "../store/config_store";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user_options } = useConfigStore();

  const handleStartInterview = () => {
    console.log("설정:", user_options);
    navigate("/recording", { state: user_options });
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h2 className="settings-title">✏️ 수업 시뮬레이션 설정</h2>
        <SettingsPanel />
        <button onClick={handleStartInterview} className="start-button">
          수업 시작 🚀
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
