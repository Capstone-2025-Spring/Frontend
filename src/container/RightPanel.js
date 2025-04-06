import React, { useEffect, useState } from "react";
import {
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

  useEffect(() => {
    const loadData = async () => {
      try {
        setEvalLoading(true);
        const data = await fetchEvaluatorData(active_evaluator);
        setPrompt(data.prompt || "");
        setCriteria(data.criteria || []);
        setEvalError(null);
      } catch (err) {
        setEvalError("불러오기 실패");
      } finally {
        setEvalLoading(false);
      }
    };
    loadData();
  }, [active_evaluator]);

  const handleRunClick = async () => {
    const result = await runEvaluation(active_evaluator, {
      prompt,
      criteria,
    });
    setOutput(result.output);
  };

  const handleAddCriterion = () => {
    if (newCriterion.trim()) {
      setCriteria([...criteria, newCriterion.trim()]);
      setNewCriterion("");
    }
  };

  const handleDeleteCriterion = (index) => {
    const updated = [...criteria];
    updated.splice(index, 1);
    setCriteria(updated);
  };

  const handleSave = async () => {
    await updateEvaluator(active_evaluator, { prompt, criteria });
    alert("저장 완료!");
  };

  return (
    <div className="right-panel-content">
      {eval_loading && <div>로딩 중...</div>}
      {eval_error && <div style={{ color: "red" }}>{eval_error}</div>}

      <div className="options-bar">
        {["COT", "GEVAL", "FactCheck", "SAGVEL"].map((opt) => (
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
          <button className="prompt-save" onClick={handleSave}>
            저장
          </button>
        </div>

        <div className="criteria-section">
          <h4>Criteria</h4>
          <div className="criteria-list">
            {(criteria || []).map((item, index) => (
              <div key={index} className="criteria-item">
                {item}
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

        <div className="output-section">
          <h4>Output</h4>
          <div className="output-box">{output}</div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
