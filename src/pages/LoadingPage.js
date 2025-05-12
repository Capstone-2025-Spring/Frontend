// pages/LoadingPage.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/LoadingPage.css";
import { useLoaderStore } from "../store/loader_store";
import { useResultStore } from "../store/result_store";
import { processMp4AndRequestFeedback } from "../util/feedback/process_mp4_and_request_feedback";
export default function LoadingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { updateLoader } = useLoaderStore.getState();
  const { setResults } = useResultStore.getState();

  useEffect(() => {
    const run = async () => {
      try {
        const feedback = await processMp4AndRequestFeedback(state.file);
        setResults([{ time: "전체", label: feedback }]);
        navigate("/result");
      } catch (err) {
        alert("❌ 분석 실패");
        console.error(err);
        updateLoader({
          current_step: "❌ 오류 발생",
          estimated_time: "잠시 후 다시 시도해주세요",
        });
      }
    };

    run();
  }, []);

  const { current_step, progress_percent, estimated_time } = useLoaderStore();

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h2 className="upload-title">📊 영상 분석 중...</h2>
        <p className="upload-status">{current_step}</p>

        <div
          style={{
            height: 20,
            width: "100%",
            background: "#e2e8f0",
            borderRadius: 10,
            overflow: "hidden",
            marginTop: 16,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress_percent}%`,
              background: "linear-gradient(to right, #667eea, #764ba2)",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        <p style={{ textAlign: "center", color: "#555", fontSize: "0.95rem" }}>
          {estimated_time ?? "잠시만 기다려주세요..."}
        </p>
      </div>
    </div>
  );
}
