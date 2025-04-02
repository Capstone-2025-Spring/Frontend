import React, { useEffect, useState } from "react";
import PipelineVisualizer from "../component/PipelineVisualizer";
import PromptEditor from "../component/PromptEditor";
import { useLLMPipelineStore } from "../store/llm_pipeline_store";
const AdminPromptPage = () => {
  const [activeTab, setActiveTab] = useState("pipeline");
  const { config, updatePrompt, updateModule, getUpdatedConfig, loadConfig } =
    useLLMPipelineStore(); // Store에서 데이터 불러오기
  // 초기 데이터 로드
  useEffect(() => {
    loadConfig(); // Store에서 데이터 로드
  }, []);

  useEffect(() => {
    console.log("Config 초기 상태:", config);
  }, [config]);
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        관리자 페이지 🛠️
      </h1>

      {/* 탭 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <button
          onClick={() => setActiveTab("prompt")}
          style={{
            padding: "0.7rem 1.5rem",
            backgroundColor: activeTab === "prompt" ? "#3b82f6" : "#e5e7eb",
            color: activeTab === "prompt" ? "#fff" : "#333",
            borderRadius: "8px",
            border: "none",
          }}
        >
          ✏️ 프롬프트 설정
        </button>
        <button
          onClick={() => setActiveTab("pipeline")}
          style={{
            padding: "0.7rem 1.5rem",
            backgroundColor: activeTab === "pipeline" ? "#3b82f6" : "#e5e7eb",
            color: activeTab === "pipeline" ? "#fff" : "#333",
            borderRadius: "8px",
            border: "none",
          }}
        >
          🔁 평가 파이프라인
        </button>
      </div>

      {/* 본문 */}
      {activeTab === "prompt" && (
        <PromptEditor
          config={config}
          updatePrompt={updatePrompt}
          updateModule={updateModule}
          getUpdatedConfig={getUpdatedConfig}
        />
      )}
      {activeTab === "pipeline" && (
        <PipelineVisualizer
          config={config}
          updatePrompt={updatePrompt}
          updateModule={updateModule}
          getUpdatedConfig={getUpdatedConfig}
        />
      )}
    </div>
  );
};

export default AdminPromptPage;
