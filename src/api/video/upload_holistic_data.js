// Holistic 데이터를 서버로 전송하지 않고, 클라이언트에서 바로 저장
export const preprocessHolisticData = async (data) => {
  try {
    // data: 이미 전처리된 JSON 형식 (frames, label 포함)

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const label = data.label ?? "unknown";
    const fileName = `holistic_label${label}_${timestamp}.json`;

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`✅ 저장 완료: ${fileName}`);
    return true;
  } catch (error) {
    console.error("❌ JSON 저장 오류:", error);
    throw error;
  }
};
