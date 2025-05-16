// src/pages/LoadingPageForLive.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLectureFeedbackWithAllData } from "../api/feedback/upload_feedback";
import "../css/LoadingPage.css";
import { useLoaderStore } from "../store/loader_store";
import { useResultStore } from "../store/result_store";

export default function LoadingPageForLive() {
  const navigate = useNavigate();
  const { updateLoader, current_step, progress_percent, estimated_time } =
    useLoaderStore();
  const { setResults } = useResultStore();

  useEffect(() => {
    const run = async () => {
      try {
        updateLoader({
          current_step: "📤 데이터 전송 중...",
          progress_percent: 30,
          estimated_time: "약 10초 소요",
        });

        const feedback = await getLectureFeedbackWithAllData();

        updateLoader({
          current_step: "✅ 분석 완료",
          progress_percent: 100,
          estimated_time: "잠시 후 결과로 이동합니다",
        });

        setResults(feedback);

        setTimeout(() => {
          navigate("/report");
        }, 1500);
      } catch (err) {
        updateLoader({
          current_step: "❌ 오류 발생",
          estimated_time: "잠시 후 다시 시도해주세요",
        });
        alert("분석 실패: " + err.message);
        console.error(err);
      }
    };

    run();
  }, []);

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h2 className="upload-title">📊 강의 분석 중...</h2>
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
