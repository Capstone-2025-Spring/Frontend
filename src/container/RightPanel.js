import { useEffect, useState } from "react";
import {
  createCriterion,
  deleteCriterion,
  fetchCriteriaByType,
  fetchEvaluatorData,
  runEvaluation,
  updateEvaluator,
} from "../api/evaluator_api";
import useAppStore from "../store/evaluator_store";

const RightPanel = () => {
  const {
    active_evaluator,
    setActiveEvaluator,
    prompt,
    setPrompt,
    criteria,
    setCriteria,
    output,
    setOutput,
    eval_loading,
    eval_error,
    setEvalLoading,
    setEvalError,
  } = useAppStore();

  const [newCriterion, setNewCriterion] = useState("");
  const [curid, setCurid] = useState(1); // 현재 evaluator ID

  // evaluator 데이터 불러오기
  useEffect(() => {
    const loadData = async () => {
      try {
        setEvalLoading(true);
        const data = await fetchEvaluatorData(active_evaluator);
        setPrompt(data.content || "");
        setCurid(data.id);
        const c_data = await fetchCriteriaByType(active_evaluator);
        setCriteria(c_data);
        setEvalError(null);
      } catch (err) {
        setEvalError("불러오기 실패");
      } finally {
        setEvalLoading(false);
      }
    };
    loadData();
  }, [active_evaluator]);

  // 평가 실행
  const handleRunClick = async () => {
    const result = await runEvaluation(active_evaluator, {
      prompt,
      criteria,
    });
    setOutput(result.output);
  };

  // 평가 기준 추가

  const handleAddCriterion = async () => {
    const trimmed = newCriterion.trim();
    if (!trimmed) return;

    try {
      const newItem = await createCriterion({
        type: active_evaluator,
        content: trimmed,
      });

      setCriteria([...criteria, newItem]); // 서버 응답 기준으로 추가
      setNewCriterion("");
    } catch (err) {
      console.error("기준 추가 실패:", err);
      alert("기준 추가 실패: " + err.message);
    }
  };

  // 평가 기준 삭제
  const handleDeleteCriterion = async (index) => {
    const target = criteria[index];
    if (!target?.id) return;

    try {
      await deleteCriterion(target.id); // 서버에 삭제 요청
      const updated = [...criteria];
      updated.splice(index, 1);
      setCriteria(updated); // 클라이언트 상태 업데이트
    } catch (err) {
      alert("삭제 실패: " + err.message);
    }
  };
  // prompt 저장 (PUT 요청)
  const handleSavePrompt = async () => {
    try {
      await updateEvaluator(curid, {
        id: curid,
        type: active_evaluator,
        content: prompt,
      });
      alert("저장 완료!");
    } catch (err) {
      alert("저장 실패: " + err.message);
    }
  };

  // 평가 기준은 현재 별도 저장되지 않음
  const handleSave = async () => {
    alert("저장 완료!");
    // TODO: criteria를 서버에 PATCH하거나 별도 저장하려면 API 필요
  };

  return (
    <div className="right-panel-content">
      {eval_loading && <div>로딩 중...</div>}
      {eval_error && <div style={{ color: "red" }}>{eval_error}</div>}

      <div className="options-bar">
        {["COT", "GEVAL", "FactCheck", "SAGEval"].map((opt) => (
          <button
            key={opt}
            className={
              active_evaluator === opt
                ? "option-button active"
                : "option-button"
            }
            onClick={() => setActiveEvaluator(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="prompt-criteria">
        {/* Prompt Section */}
        <div className="prompt-section">
          <h4>Prompt</h4>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
          />
          <button className="run-button" onClick={handleRunClick}>
            Run
          </button>
          <button className="prompt-save" onClick={handleSavePrompt}>
            저장
          </button>
        </div>

        {/* Criteria Section */}
        <div className="criteria-section">
          <h4>Criteria</h4>
          <div className="criteria-list">
            {(criteria || []).map((item, index) => (
              <div key={index} className="criteria-item">
                {item.content}
                <button onClick={() => handleDeleteCriterion(index)}>
                  삭제
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={newCriterion}
            onChange={(e) => setNewCriterion(e.target.value)}
            placeholder="새 기준 입력"
          />
          <div className="criteria-buttons">
            <button onClick={handleAddCriterion}>추가</button>
            <button onClick={handleSave}>저장</button>
          </div>
        </div>

        {/* Output Section */}
        <div className="output-section">
          <h4>Output</h4>
          <div className="output-box">{output}</div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
