// src/store/audio_store.js
import { create } from "zustand";
import { upload_audio } from "../api/audio/upload_audio";
import { ConvertWavToMp3 } from "../util/ffmpeg/convert_wav_to_mp3"; // 변환 함수 임포트

export const useAudioStore = create((set, get) => ({
  mediaRecorder: null, // 오디오 녹음 인스턴스(MediaRecorder)를 저장하는 상태
  audioChunks: [], // 녹음된 오디오 데이터를 임시 저장하는 배열

  // 오디오 녹음 시작 함수
  startAudioRecording: async () => {
    try {
      // 사용자의 마이크 접근 권한 요청 및 오디오 스트림 획득
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 오디오 스트림으로부터 MediaRecorder 인스턴스 생성
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = []; // 녹음 중 발생한 데이터를 저장할 임시 배열

      // 데이터가 녹음될 때마다 호출되는 이벤트 핸들러
      mediaRecorder.ondataavailable = (e) => {
        // 데이터가 존재하면 chunks 배열에 추가
        if (e.data.size > 0) chunks.push(e.data);
      };

      // 녹음이 종료될 때 호출되는 이벤트 핸들러
      mediaRecorder.onstop = async () => {
        console.log(chunks);
        // 임시 저장된 오디오 데이터를 합쳐 하나의 오디오 파일(.wav) 생성
        const webmBlob = new Blob(chunks, { type: "audio/wav" });
        // Blob 생성 이후 ↓ 추가

        // 🧠 FFmpeg를 이용해 mp3로 변환
        const mp3Blob = await ConvertWavToMp3(webmBlob);

        if (!mp3Blob) {
          console.error("❌ MP3 변환 실패");
          return;
        }
        const url = URL.createObjectURL(mp3Blob);

        // 다운로드용 링크 생성
        const a = document.createElement("a");
        a.href = url;
        a.download = "recorded_audio"; // 저장될 파일 이름
        a.click();

        // 미리 듣기용 콘솔 출력도 가능
        console.log("🎧 미리 듣기 URL:", url);

        // ▶️ 생성된 오디오 파일(.wav)을 서버에 업로드
        try {
          const res = await upload_audio(mp3Blob);
          console.log("✅ Audio uploaded:", res); // 업로드 성공 시 결과 출력
        } catch (err) {
          console.error("❌ Audio upload failed:", err); // 업로드 실패 시 에러 출력
        }
      };

      // 녹음 시작
      mediaRecorder.start();

      // 생성된 MediaRecorder 인스턴스와 chunks 배열을 Zustand 상태로 저장
      set({ mediaRecorder, audioChunks: chunks });
    } catch (err) {
      console.error("❌ Failed to access microphone:", err); // 마이크 접근 실패 시 에러 출력
    }
  },

  // 오디오 녹음 종료 함수
  stopAudioRecording: () => {
    const { mediaRecorder } = get(); // 현재 상태에서 MediaRecorder 인스턴스를 가져옴
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop(); // MediaRecorder가 활성화 상태일 때만 녹음 중지
    }
  },
}));
