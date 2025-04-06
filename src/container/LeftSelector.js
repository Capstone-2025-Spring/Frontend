import React, { useEffect } from "react";
import { fetchTargetData } from "../api/data_api";
import useAppStore from "../store/evaluator_store"; // 하나로 합쳐진 store

const LeftSelector = () => {
  const {
    active_target,
    setActiveTarget,
    target_data,
    setTargetData,
    data_loading,
    data_error,
    setDataLoading,
    setDataError,
  } = useAppStore();

  const tabs = ["SST", "VideoCaption", "AudioAnalysis"];

  useEffect(() => {
    const loadData = async () => {
      try {
        setDataLoading(true);
        const data = await fetchTargetData(active_target);
        setTargetData(data.content || "");
        setDataError(null);
      } catch (err) {
        setDataError("데이터 로딩 실패");
      } finally {
        setDataLoading(false); // ✅ 여기 잘못돼 있던 부분 고침
      }
    };
    loadData();
  }, [active_target]);

  return (
    <div className="left-selector">
      <div className="feature-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={
              active_target === tab ? "option-button active" : "option-button"
            }
            onClick={() => setActiveTarget(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="feature-content">
        <h4>{active_target} 데이터</h4>
        {data_loading && <div>로딩 중...</div>}
        {data_error && <div style={{ color: "red" }}>{data_error}</div>}
        {!data_loading && !data_error && (
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "14px" }}>
            {target_data || "데이터 없음"}
          </pre>
        )}
      </div>
    </div>
  );
};

export default LeftSelector;
