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
      <p style={{ color: "#6b7280" }}>
        <img
          src="/event_images/classroom.png"
          alt="classroom"
          style={{
            marginTop: "1rem",
            maxWidth: "100%",
            borderRadius: "8px",
          }}
        />
      </p>
    </div>
  );
}
