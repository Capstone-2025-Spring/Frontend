import React, { useEffect, useRef, useState } from "react";
import ModuleContainer from "../container/ModuleContainer";
import COTModuleBox from "./module/COTModuleBox";
import FactCheckerModuleBox from "./module/FactCheckerModuleBox";
import GEvalModuleBox from "./module/GEvalModuleBox";
import SAGEvalModuleBox from "./module/SAGEvalModuleBox";
import TruthGroundedModuleBox from "./module/TruthGroundedModuleBox";
import UnifiedModuleBox from "./module/UnifiedModuleBox";

// 각 모듈 컴포넌트에 대한 매핑
const componentMap = {
  COTModuleBox,
  GEvalModuleBox,
  SAGEvalModuleBox,
  FactCheckerModuleBox,
  TruthGroundedModuleBox,
};

const PipelineVisualizer = ({
  config,
  updatePrompt,
  updateModule,
  getUpdatedConfig,
}) => {
  const [locked, setLocked] = useState(true);
  const containerRef = useRef(null);
  const refs = useRef({});

  // 초기 데이터 로드
  useEffect(() => {
    console.log("Config 초기 상태:", config);
  }, []);

  const toggleLock = () => {
    setLocked(!locked);
  };

  const handlePromptChange = (id, newPrompt) => {
    const updatedModules = config.modules.map((mod) =>
      mod.id === id ? { ...mod, prompt: newPrompt } : mod
    );
    const updated = { ...config, modules: updatedModules };
  };

  const renderModule = (mod) => {
    const Component = componentMap[mod.name] || UnifiedModuleBox;
    return (
      <ModuleContainer
        key={mod.id}
        id={mod.id}
        initialPosition={mod.position}
        draggable={!locked}
      >
        <Component
          moduleId={mod.id}
          title={mod.name}
          color="#3b82f6"
          inputs={mod.inputs || []}
          outputs={mod.outputs || []}
          defaultPrompt={mod.prompt || ""}
          criteria={mod.criteria}
          reference={mod.reference}
          custom={mod.custom}
          inputRef={refs.current[mod.id]?.inputRef}
          outputRef={refs.current[mod.id]?.outputRef}
          onPromptChange={handlePromptChange}
        />
      </ModuleContainer>
    );
  };

  if (!config) return <div>Loading...</div>;

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100vh" }}
    >
      <button
        onClick={toggleLock}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          backgroundColor: locked ? "#6b7280" : "#3b82f6",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {locked ? "🔒 잠금 해제" : "🔒 위치 고정"}
      </button>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          background: "#f9fafb",
          borderRadius: "12px",
        }}
      >
        {config.modules.map(renderModule)}
      </div>
    </div>
  );
};

export default PipelineVisualizer;
