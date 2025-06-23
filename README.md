#Edu-Mate Frontend

Edu-Mate는 예비 교사 및 발표자들을 위한 AI 기반 강의 피드백 시스템입니다. 이 프론트엔드는 사용자로부터 웹캠, 마이크, 교안 파일 등을 입력받아 백엔드 및 AI 서버와 연동하여 실시간/업로드 기반의 분석 결과를 제공합니다.

## 기술 스택

- React.js
- Zustand (상태 관리)

##실행 방법

```bash
npm install
npm start

##페이지 구성
| 경로              | 컴포넌트                 | 설명                    |
| --------------- | -------------------- | --------------------- |
| `/`             | `MainPage`           | 초기 홈 화면               |
| `/checkMedia`   | `CheckMediaPage`     | 웹캠/마이크 동작 테스트         |
| `/questions`    | `QuestionPage`       | 사용자 맞춤 질문/피드백 설정      |
| `/settings`     | `SettingPage`        | 사용자 시뮬레이션 설정값 지정      |
| `/recording`    | `RecordingPage`      | 실시간 강의 녹화 및 분석 시작     |
| `/upload`       | `UploadVideoPage`    | 영상 파일 업로드 기반 분석       |
| `/loading`      | `LoadingPage`        | 분석 결과 대기 중 (업로드 분석)   |
| `/loading-live` | `LoadingPageForLive` | 실시간 녹화 후 대기 화면        |
| `/report`       | `ReportPage`         | 최종 피드백 결과 시각화         |
| `/dummy`        | `DummyReportPage`    | 테스트용 결과 페이지           |
| `/admin`        | `AdminPage`          | 관리자용 기능 페이지, 백오피스 (설정 수정 등) |


