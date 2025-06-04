import { useEffect, useRef, useState } from "react";
import "../css/ReportPage.css";
import { useEventStore } from "../store/event_store";
import { useResultStore } from "../store/result_store";
import { useWebcam2Store } from "../store/webcam2_store";
const ReportPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [playRange, setPlayRange] = useState({ start: 0, end: 0 });
  const { results } = useResultStore();
  const { event_results } = useEventStore();
  const { videoBlobUrl } = useWebcam2Store();
  const videoRef = useRef();
  const {
    overallScore,
    overallReason,
    criteriaScores = [],
    vocabDifficulty,
    blockedWords = [],
    eventScore = "채점 없음",
    eventReason = "피드백 없음",
    motionCaptions = [],
  } = results;
  useEffect(() => {
    if (videoBlobUrl) {
      console.log("✅ videoBlobUrl 확인:", videoBlobUrl);
    }
  }, [videoBlobUrl]);

  const handlePlaySegment = (sMin, sSec, eMin, eSec) => {
    const start = parseInt(sMin) * 60 + parseInt(sSec);
    const end = parseInt(eMin) * 60 + parseInt(eSec);
    setPlayRange({ start, end });
    setShowPopup(true);
  };
  useEffect(() => {
    return () => {
      if (videoBlobUrl) {
        URL.revokeObjectURL(videoBlobUrl);
      }
    };
  }, []);
  useEffect(() => {
    if (showPopup && videoRef.current) {
      const video = videoRef.current;
      video.currentTime = playRange.start;
      video.play();

      const interval = setInterval(() => {
        if (video.currentTime >= playRange.end) {
          video.pause();
          clearInterval(interval);
        }
      }, 200);

      return () => clearInterval(interval);
    }
  }, [showPopup, playRange]);

  //console.log(event_results);
  return (
    <div className="report-page">
      {showPopup && (
        <div
          className="video-popup-overlay"
          onClick={() => setShowPopup(false)}
        >
          <div className="video-popup" onClick={(e) => e.stopPropagation()}>
            {videoBlobUrl ? (
              <video
                ref={videoRef}
                src={videoBlobUrl}
                controls
                style={{ width: "100%", borderRadius: "12px" }}
              />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  color: "#999",
                }}
              >
                🎬 영상 데이터가 없습니다.
              </div>
            )}
          </div>
        </div>
      )}
      <div className="report-card">
        <h2 className="report-title">분석 레포트</h2>
        <section className="report-section">
          <h3 className="report-subtitle">1. 총평</h3>
          <p>
            <strong>총점: {overallScore} / 10</strong>
          </p>
          <p style={{ marginTop: "0.5rem", color: "#444" }}>{overallReason}</p>
        </section>

        <section className="report-section">
          <h3 className="report-subtitle">2. 세부 평가 항목</h3>
          <table className="report-table">
            <thead>
              <tr>
                <th>항목</th>
                <th>점수</th>
                <th>피드백</th>
              </tr>
            </thead>
            <tbody>
              {criteriaScores.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.score}</td>
                  <td>{item.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="report-section">
          <h3 className="report-subtitle">3. 어휘 수준 분석</h3>
          <p>
            사용 어휘 수준: <strong>{vocabDifficulty}</strong>
          </p>
          {blockedWords.length > 0 && (
            <>
              <p style={{ marginTop: "0.5rem" }}>
                부적절하거나 주제에서 벗어난 단어:
              </p>
              <ul>
                {blockedWords.map((word, idx) => (
                  <li key={idx}>🟥 {word}</li>
                ))}
              </ul>
            </>
          )}
        </section>

        {(eventScore || eventReason) && (
          <section className="report-section">
            <h3 className="report-subtitle">4. 돌발 상황 대처</h3>
            <p>
              점수: <strong>{eventScore || "채점 없음"}</strong>
            </p>
            <p>{eventReason || "피드백 없음"}</p>
          </section>
        )}
        {motionCaptions.length > 0 && (
          <section className="report-section">
            <h3 className="report-subtitle">5. 동작 분석 기반 캡션</h3>
            <table className="report-table">
              <thead>
                <tr>
                  <th>시작 시간</th>
                  <th>종료 시간</th>
                  <th>행동 라벨</th>
                  <th>피드백</th>
                </tr>
              </thead>

              <tbody>
                {motionCaptions.map((item, idx) => (
                  <tr key={idx}>
                    <td>{`${item.startMin}분 ${item.startSec}초`}</td>
                    <td>{`${item.endMin}분 ${item.endSec}초`}</td>
                    <td>{item.label}</td>
                    <td>{item.reason}</td>
                    <td>
                      <button
                        onClick={() =>
                          handlePlaySegment(
                            item.startMin,
                            item.startSec,
                            item.endMin,
                            item.endSec
                          )
                        }
                        className="report-play-button"
                      >
                        ▶ 재생
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
