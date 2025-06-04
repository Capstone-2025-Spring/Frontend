import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsPanel from "../container/SettingsPanel";
import "../css/UploadVideoPage.css";
import { useWebcam2Store } from "../store/webcam2_store";
export const UploadVideoPage = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const { setUploadedVideoFile } = useWebcam2Store();
  const navigate = useNavigate();
  const handleUpload = async () => {
    if (!videoFile) return;
    setUploadedVideoFile(videoFile); //
    setProcessing(true);
    setResults(null);

    // 먼저 페이지 이동 → 로딩 페이지에서 processMp4AndRequestFeedback 실행
    navigate("/loading", { state: { file: videoFile } });
  };

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h1 className="upload-title">강의 영상 자동 평가</h1>

        <button
          className="upload-button"
          style={{ marginBottom: "1rem" }}
          onClick={() => setShowSettings(!showSettings)}
        >
          설정 열기 / 닫기
        </button>

        {showSettings && <SettingsPanel />}

        <label className="upload-label">MP4 파일 선택</label>
        <input
          type="file"
          accept="video/mp4"
          className="upload-input"
          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
        />

        <button
          className="upload-button"
          onClick={handleUpload}
          disabled={!videoFile || processing}
        >
          {processing ? " 분석 중..." : "평가 시작하기"}
        </button>

        {processing && (
          <p className="upload-status">AI가 영상을 분석 중입니다...</p>
        )}

        {results && (
          <div className="upload-result">
            <h2>분석 결과</h2>
            <ul>
              {results.map((r, i) => (
                <li key={i}>
                  <strong>{r.time}s</strong> - {r.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
