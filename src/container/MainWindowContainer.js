export default function MainWindowContainer() {
  return (
    <div
      style={{
        width: "80%",
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h3 style={{ fontSize: "1.5rem", color: "#374151" }}>메인 콘텐츠 영역</h3>
      <p style={{ color: "#6b7280" }}>
        여기에 교안, 피드백, 슬라이드 등을 표시할 수 있습니다.
      </p>
    </div>
  );
}
