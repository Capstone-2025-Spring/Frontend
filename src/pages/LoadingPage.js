// pages/LoadingPage.js
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/LoadingPage.css";
import { useLoaderStore } from "../store/loader_store";
import { useResultStore } from "../store/result_store";
import { processMp4AndRequestFeedback } from "../util/feedback/process_mp4_and_request_feedback";

export default function LoadingPage() {
  const { state } = useLocation(); // state.file에 mp4 Blob 들어있음
  const navigate = useNavigate();
  const { updateLoader } = useLoaderStore.getState();
  const { setResults } = useResultStore.getState();

  useEffect(() => {
    const run = async () => {
      try {
        const feedback = await processMp4AndRequestFeedback(state.file);

        // ✅ ReportPage용 결과 형식에 맞춰 저장
        setResults(feedback);

        navigate("/report ");
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
        <h2 className="upload-title"> 영상 분석 중 입니다다...</h2>
        <p className="upload-status">{current_step}</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress_percent}%` }}
          />
        </div>

        <p className="upload-status">
          {estimated_time ?? "잠시만 기다려주세요..."}
        </p>
      </div>
    </div>
  );
}
