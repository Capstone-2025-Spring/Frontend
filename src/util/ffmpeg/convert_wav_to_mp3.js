import { FFmpeg } from "@ffmpeg/ffmpeg";

const ffmpeg = new FFmpeg();
await ffmpeg.load();

export const ConvertWavToMp3 = async (webmBlob) => {
  console.log("🎧 이벤트 wavBlob", webmBlob);
  console.log("📏 이벤트 wavBlob size:", webmBlob.size);
  console.log("🧪 blob type:", webmBlob.type);
  const fetchFile = async (blob) => {
    const buffer = await blob.arrayBuffer();
    return new Uint8Array(buffer);
  };

  try {
    if (!ffmpeg.loaded) {
      console.log("📦 FFmpeg 로딩 중...");
      await ffmpeg.load();
    }

    // 1. 파일 시스템에 WebM 파일 쓰기
    await ffmpeg.writeFile("input.wav", await fetchFile(webmBlob));

    // 2. 변환 실행 
    await ffmpeg.exec([
      "-i",
      "input.wav",
      "-codec:a",
      "libmp3lame",
      "-qscale:a",
      "2",
      "output.mp3",
    ]);

    // 3. 변환된 MP3 파일 읽기
    const data = await ffmpeg.readFile("output.mp3");

    // 4. Blob으로 변환
    const mp3Blob = new Blob([data.buffer], { type: "audio/mp3" });
    console.log("mp3 변환 성공");
    return mp3Blob;
  } catch (error) {
    console.error("❌ FFmpeg 변환 오류:", error);
    return null;
  }
};
