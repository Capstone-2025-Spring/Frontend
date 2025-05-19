import { useConfigStore } from "../../store/config_store";

export async function uploadEventData({ audio, holistic, eventInfo }) {
  const { user_options } = useConfigStore.getState();

  if (!audio || !holistic || !user_options || !eventInfo) {
    const missingFields = [];
    if (!audio) missingFields.push("audio");
    if (!holistic) missingFields.push("holistic");
    if (!user_options) missingFields.push("user_options");
    if (!eventInfo) missingFields.push("eventInfo");

    console.error(`❌ 필수 필드 누락: ${missingFields.join(", ")}`);
    throw new Error(`uploadEventData: 필드 누락 (${missingFields.join(", ")})`);
  }

  const config = new Blob([JSON.stringify(user_options)], {
    type: "application/json",
  });

  const formData = new FormData();

  formData.append("file", audio, "event_audio.mp3");
  formData.append(
    "holistic",
    new Blob([JSON.stringify(holistic)], { type: "application/json" }),
    "event_holistic.json"
  );
  formData.append(
    "config",
    new Blob([JSON.stringify(config)], { type: "application/json" }),
    "config.json"
  );
  formData.append("eventInfo", eventInfo);

  const res = await fetch("/api/lecture/feedback/event", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "본문 없음");
    throw new Error(
      `❌ 서버 응답 오류: ${res.status} ${res.statusText}\n${errorText}`
    );
  }

  return await res.json();
}
