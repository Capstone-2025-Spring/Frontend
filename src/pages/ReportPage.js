import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ReportPage = () => {
  // === 분석 예시 데이터 ===
  const voiceFrequencyData = [100, 110, 115, 120, 118, 122, 119, 117, 121, 125];
  const averagePitch = 118;
  const averageIntensity = 74;

  const vocabularyWarnings = [
    "초등학교 3학년에게 '미지수 x'와 같은 중등 수준의 표현 사용 - 12분01초(하이퍼링크)",
    "'형용사'를 반복적으로 사용하여 어휘 다양성이 부족함",
    "학생 수준을 고려하지 않은 전문 용어 사용",
  ];

  const nonverbalWarnings = [
    "칠판 판서 시 완전히 뒤돌아서 설명",
    "발표 중 시선이 바닥을 향함",
    "손동작이 과도하거나 부자연스러움",
  ];

  const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";

  const voiceChartData = {
    labels: voiceFrequencyData.map((_, i) => `${i + 1}초`),
    datasets: [
      {
        label: "목소리 주파수 (Hz)",
        data: voiceFrequencyData,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>분석 레포트</h2>

      <section style={sectionStyle}>
        <h3 style={sectionTitleStyle}>1. 어휘 분석 - 부적절 사용 예시</h3>
        <ul>
          {vocabularyWarnings.map((item, idx) => (
            <li key={idx}>🟥 {item}</li>
          ))}
        </ul>
      </section>

      <section style={sectionStyle}>
        <h3 style={sectionTitleStyle}>2. 목소리 분석</h3>
        <Line data={voiceChartData} />
        <p style={{ marginTop: "1rem" }}>
          평균 목소리 주파수: <strong>{averagePitch} Hz</strong> <br />
          평균 목소리 강세: <strong>{averageIntensity} dB</strong>
        </p>
      </section>

      <section style={sectionStyle}>
        <h3 style={sectionTitleStyle}>3. 비언어적 표현 - 주의 사항</h3>
        <ul>
          {nonverbalWarnings.map((item, idx) => (
            <li key={idx}>🟥 {item}</li>
          ))}
        </ul>
      </section>

      <section style={sectionStyle}>
        <h3 style={sectionTitleStyle}>4. 총 점수</h3>

        <p>
          이 서비스를 이용하는 사람들의 평균적인 점수는 <strong>76점</strong>
          입니다. <br />
          <a
            href="/rankings"
            style={{ color: "#2563eb", textDecoration: "underline" }}
          >
            👉 다른 사람들 점수 보러가기
          </a>
        </p>

        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#2e7d32",
            marginTop: "1rem",
          }}
        >
          📌 나의 점수: 82 / 100
        </p>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>항목</th>
              <th style={thStyle}>나의 점수</th>
              <th style={thStyle}>평균 점수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>어휘 다양성</td>
              <td style={tdStyle}>78</td>
              <td style={tdStyle}>72</td>
            </tr>
            <tr>
              <td style={tdStyle}>목소리 안정성</td>
              <td style={tdStyle}>80</td>
              <td style={tdStyle}>74</td>
            </tr>
            <tr>
              <td style={tdStyle}>비언어 표현</td>
              <td style={tdStyle}>75</td>
              <td style={tdStyle}>70</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={sectionStyle}>
        <h3 style={sectionTitleStyle}>5. 다시보기 영상</h3>
        {videoUrl ? (
          <video controls width="100%" style={{ borderRadius: "8px" }}>
            <source src={videoUrl} type="video/mp4" />
            브라우저가 video 태그를 지원하지 않습니다.
          </video>
        ) : (
          <p style={{ color: "#999" }}>다시보기 영상이 없습니다.</p>
        )}
      </section>
    </div>
  );
};

// ===== Style Section =====
const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "2rem",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: "#f9fafb",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
};

const titleStyle = {
  fontSize: "2rem",
  textAlign: "center",
  marginBottom: "2rem",
  color: "#333",
};

const sectionStyle = {
  marginBottom: "2rem",
  padding: "1.5rem",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
};

const sectionTitleStyle = {
  fontSize: "1.2rem",
  marginBottom: "1rem",
  color: "#444",
};

const tableStyle = {
  width: "100%",
  marginTop: "1.5rem",
  borderCollapse: "collapse",
  textAlign: "center",
  fontSize: "0.95rem",
};

const thStyle = {
  backgroundColor: "#f0f0f0",
  padding: "0.75rem",
  border: "1px solid #ccc",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "0.75rem",
  border: "1px solid #ccc",
};

export default ReportPage;
