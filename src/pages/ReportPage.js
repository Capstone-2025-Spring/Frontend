import "../css/ReportPage.css";
import { useEventStore } from "../store/event_store";
import { useResultStore } from "../store/result_store";
const ReportPage = () => {
  const { results } = useResultStore();
  const { event_results } = useEventStore();

  const {
    overallScore,
    overallReason,
    criteriaScores = [],
    vocabDifficulty,
    blockedWords = [],
    eventScore,
    eventReason,
  } = results;
  console.log(results);
  //console.log(event_results);
  return (
    <div className="report-page">
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
      </div>
    </div>
  );
};

export default ReportPage;
