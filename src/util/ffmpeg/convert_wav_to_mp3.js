import { FFmpeg } from "@ffmpeg/ffmpeg";

const ffmpeg = new FFmpeg();
await ffmpeg.load();

export const ConvertWavToMp3 = async (webmBlob) => {
  const fetchFile = async (blob) => {
    const buffer = await blob.arrayBuffer();
    return new Uint8Array(buffer);
  };

  try {
    if (!ffmpeg.loaded) {
      console.log("📦 FFmpeg 로딩 중...");
      await ffmpeg.load();
    }

    const fileName = "input.wav";
    ffmpeg.FS("writeFile", fileName, await fetchFile(webmBlob));
    await ffmpeg.run(
      "-i",
      fileName,
      "-codec:a",
      "libmp3lame",
      "-qscale:a",
      "2",
      "output.mp3"
    );

    const data = ffmpeg.FS("readFile", "output.mp3");
    const mp3Blob = new Blob([data.buffer], { type: "audio/mpeg" });

    return mp3Blob;
  } catch (error) {
    console.error("❌ MP3 변환 실패:", error);
  }
};
