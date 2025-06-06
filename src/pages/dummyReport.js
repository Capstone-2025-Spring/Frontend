import { useEffect, useRef, useState } from "react";
import "../css/ReportPage.css";

const dummyResults = {
  overallScore: 4.0,
  overallReason:
    "강의는 나눗셈의 개념과 나눗셈의 몫을 다루고 있지만, 강의 분량이 부족하고, 음성 전달력과 모션 활용이 부족하여 이해를 돕지 못했습니다. 또한, 강의 대상과 환경과의 일치성이 부족하며, 강의 제목과 내용의 일치성이 떨어져 일관성이 부족합니다. 추가적인 개선이 필요한 부분이 많이 있습니다.",
  criteriaScores: [
    {
      name: "어휘 수준 평가",
      score: 6,
      reason:
        "강의에서 사용된 전문 용어와 일반 용어의 혼용은 일부 적절하나, 몇몇 용어의 설명이 부족하여 이해를 돕지 못하는 부분이 있습니다. 전문 용어인 '나눗셈'과 '나눗셈의 몫'을 사용하였지만, 설명이 더 부가되어야 할 필요성이 있습니다.",
    },
    {
      name: "문장 구조 및 흐름 평가",
      score: 4,
      reason:
        "강의의 문장 구조가 단조롭고 반복적이며, 논리적인 전개가 부족하여 이해하기 어려운 부분이 있습니다. 문장 구조의 다양성과 논리적인 전개를 강화하여 강의의 흐름을 더 명확하게 전달할 필요가 있습니다.",
    },
    {
      name: "음성 전달력 평가",
      score: 3,
      reason:
        "음성 전달력이 단조하고 강조가 부족하며, 말속도가 일정하여 모노톤한 인상을 주었습니다. 음성의 다양성과 감정 전달을 향상시켜 학습자의 흥미를 유발할 수 있는 방향으로 발전시킬 필요가 있습니다.",
    },
    {
      name: "모션 기반 전달 평가",
      score: 5,
      reason:
        "모션의 활용이 부족하고, 강의를 보다 생동감 있게 만들어주는 적절한 모션의 활용이 부족했습니다. 모션을 더 다양하게 활용하여 강의를 시각적으로 더 풍부하게 만들어야 합니다.",
    },
    {
      name: "전체 커뮤니케이션 평가",
      score: 4,
      reason:
        "텍스트, 음성, 모션 간의 일치성이 부족하며, 청중을 적극적으로 참여시키는 요소가 부족했습니다. 각 요소 간의 일관성을 강화하고, 학습자의 참여를 유도할 수 있는 방법을 고민해야 합니다.",
    },
    {
      name: "강의 대상과 유형, 환경과의 일치성 평가",
      score: 4,
      reason:
        "강의 대상인 초등 고학년을 고려한 강의이지만, 강의 내용과 제목의 일치성이 부족하여 일관성이 떨어집니다. 강의 대상과 환경에 맞는 적절한 내용과 제목을 선택하여 일관성을 강화해야 합니다.",
    },
    {
      name: "강의 주제와의 일치성 평가",
      score: 5,
      reason:
        "강의는 나눗셈의 개념과 나눗셈의 몫을 다루고 있지만, 강의 제목과 주제와의 일치성이 부족하여 일관성이 떨어집니다. 강의 주제와 제목을 일치시켜 강의의 일관성을 높이는 작업이 필요합니다.",
    },
    {
      name: "비언어적 전달력",
      score: 7,
      reason:
        "강사는 손짓과 표정을 적극 활용하여 설명을 보다 생동감 있게 전달했으나, 가끔씩 일관된 제스처나 표정이 부족한 부분이 있었습니다. 이는 강의 내용을 이해하는 데 일부 혼란을 줄 수 있을 것으로 판단됩니다.",
    },
  ],
  vocabDifficulty: "적절",
  blockedWords: ["보고", "호의", "사랑", "수학", "선수"],
  eventScore: 4,
  eventReason:
    "예상치 못한 질문에 당황하여 답변이 매끄럽지 못했고, 추가 설명이 부족했습니다.",
  motionCaptions: [
    {
      startMin: 0,
      startSec: 53,
      endMin: 0,
      endSec: 54,
      label: "손 머리에 대는 중",
      reason:
        "강의 중 손으로 머리를 만지는 행동은 자신에 대한 불안을 보일 수 있다.",
    },
    {
      startMin: 1,
      startSec: 5,
      endMin: 1,
      endSec: 20,
      label: "고개를 숙이고 있음",
      reason: "강의 중 고개를 숙이는 자세는 자신감 부족으로 인식될 수 있다.",
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
