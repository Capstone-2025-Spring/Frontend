import { useEffect, useRef, useState } from "react";
import "../css/ReportPage.css";
const dummyResults = {
  overallScore: 8.6,
  overallReason:
    "정승제 선생님의 강의는 분수와 순환소수, 무한소수의 개념을 명확하고 체계적으로 설명하며, 다양한 비언어적 요소와 예시를 적절히 활용해 학습자의 이해와 흥미를 모두 높였습니다. 강의 대상과 환경에 적합한 언어와 실제 생활 예시를 사용하였으며, 강의 주제와 제목, 내용이 일치하여 일관성이 뛰어납니다. 전반적으로 우수한 강의입니다.",
  criteriaScores: [
    {
      name: "용어 설명의 명확성 및 수준",
      score: 9,
      reason:
        "분수, 순환소수, 무한소수 등 주요 용어를 명확히 설명하고, 초등 고학년 수준에 맞는 쉬운 언어로 풀어 설명하여 학습자가 쉽게 이해할 수 있었습니다.",
    },
    {
      name: "문장 구조 및 논리적 흐름",
      score: 8,
      reason:
        "분수와 순환소수, 무한소수 개념별로 논리적 순서를 갖추어 설명하였고, 단계별 예시를 통해 학습자가 자연스럽게 따라올 수 있도록 구성되었습니다.",
    },
    {
      name: "음성 전달력",
      score: 9,
      reason:
        "중요 개념마다 명확한 발음과 적절한 억양, 속도 조절로 학습자의 집중을 유도하였으며, 친근한 목소리로 부담 없이 내용을 전달했습니다.",
    },
    {
      name: "비언어적 전달력 (제스처, 표정 등)",
      score: 8,
      reason:
        "강사는 손짓, 표정, 시선 등 다양한 비언어적 요소를 활용하여 내용을 생동감 있게 전달했고, 학습자의 주의를 효과적으로 이끌었습니다.",
    },
    {
      name: "전체 커뮤니케이션 및 상호작용",
      score: 8,
      reason:
        "질문, 퀴즈, 실생활 예시 등 다양한 상호작용을 통해 학습자의 참여를 유도하고, 즉각적인 피드백으로 이해도를 높였습니다.",
    },
    {
      name: "강의 대상 및 환경과의 일치성",
      score: 9,
      reason:
        "초등 고학년 학생의 수준과 학습 환경을 고려한 설명과 예시를 사용하여, 대상에 최적화된 강의였습니다.",
    },
    {
      name: "강의 주제와의 합치 및 일관성",
      score: 9,
      reason:
        "강의 제목, 내용, 예시, 결론까지 모두 분수와 순환소수, 무한소수에 집중되어 일관성이 매우 뛰어났습니다.",
    },
  ],
  vocabDifficulty: "적절",
  blockedWords: ["방정식", "함수", "유리수"],
  eventScore: 8,
  eventReason:
    "예상치 못한 질문에도 침착하게 답변하며 추가 설명을 곁들여 학습자의 궁금증을 해소했습니다.",
  motionCaptions: [
    {
      startMin: 0,
      startSec: 40,
      endMin: 0,
      endSec: 44,
      label: "고개를 숙이고 있음",
      reason:
        "강의 중 고개를 숙이고 있는 행동은 학습자와의 소통이 약해질 수 있으므로 주의가 필요합니다.",
    },
    {
      startMin: 1,
      startSec: 20,
      endMin: 1,
      endSec: 23,
      label: "손 머리에 대는중",
      reason:
        "손을 머리에 대는 행동은 불안감이나 자신감 부족으로 비춰질 수 있으므로 강의 중 지양해야 합니다.",
    },
  ],
};

const dummyVideoBlobUrl = null; // 또는 테스트용 임의 URL

const DummyReportPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [playRange, setPlayRange] = useState({ start: 0, end: 0 });
  const videoRef = useRef();

  const {
    overallScore,
    overallReason,
    criteriaScores,
    vocabDifficulty,
    blockedWords,
    eventScore,
    eventReason,
    motionCaptions,
  } = dummyResults;

  const videoBlobUrl = dummyVideoBlobUrl;

  const handlePlaySegment = (sMin, sSec, eMin, eSec) => {
    const start = parseInt(sMin) * 60 + parseInt(sSec);
    const end = parseInt(eMin) * 60 + parseInt(eSec);
    setPlayRange({ start, end });
    setShowPopup(true);
  };

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
                  <th></th>
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

export default DummyReportPage;
