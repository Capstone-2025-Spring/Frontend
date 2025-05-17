import { useState } from "react";
import CriteriaRecommendation from "../container/CriteriaRecommandation";
import "../css/UserCriteriaSelector.css";
import { useConfigStore } from "../store/config_store";

const recommendedCriteria = [
  "정승제 스타일",
  "친절함",
  "역동적인",
  "날카로운",
  "멋있는",
  "소통이 활발한",
];

const UserCriteriaSelector = () => {
  const { user_options, update_user_option } = useConfigStore();
  const [inputValue, setInputValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const toggleCriterion = (criterion) => {
    const current = user_options.user_criteria;
    if (current.includes(criterion)) {
      update_user_option(
        "user_criteria",
        current.filter((c) => c !== criterion)
      );
    } else {
      update_user_option("user_criteria", [...current, criterion]);
    }
  };
  const addRecommendedCriteria = (newCriteriaList) => {
    const current = user_options.user_criteria;
    const merged = [
      ...current,
      ...newCriteriaList.filter((c) => !current.includes(c)),
    ];
    update_user_option("user_criteria", merged);
  };
  const handleCustomAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed.length > 0 && !user_options.user_criteria.includes(trimmed)) {
      update_user_option("user_criteria", [
        ...user_options.user_criteria,
        trimmed,
      ]);
      setInputValue("");
    }
  };

  const handleRemove = (criterion) => {
    update_user_option(
      "user_criteria",
      user_options.user_criteria.filter((c) => c !== criterion)
    );
  };

  return (
    <>
      <div className="criteria-section">
        <label className="criteria-title"> 사용자 평가 기준 선택</label>
        <div className="criteria-list">
          {recommendedCriteria.map((item) => (
            <div
              key={item}
              className={`criteria-pill ${
                user_options.user_criteria.includes(item) ? "selected" : ""
              }`}
              onClick={() => toggleCriterion(item)}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="criteria-input-row">
          <input
            type="text"
            className="criteria-input"
            placeholder="직접 추가할 기준을 입력하세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCustomAdd();
            }}
          />
        </div>

        <button className="recommend-button" onClick={() => setShowPopup(true)}>
          추천받기
        </button>
        <div className="criteria-chip-container">
          {user_options.user_criteria.map((c, i) => (
            <div className="criteria-chip" key={i}>
              {c}
              <button onClick={() => handleRemove(c)}>×</button>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="criteria-popup-container">
          <button
            className="popup-close-button"
            onClick={() => setShowPopup(false)}
          >
            ×
          </button>
          <CriteriaRecommendation
            onClose={() => setShowPopup(false)}
            onSelect={addRecommendedCriteria}
          />
        </div>
      )}
    </>
  );
};

export default UserCriteriaSelector;
