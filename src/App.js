import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminPage from "./pages/AdminPage";
import CheckMediaPage from "./pages/CheckMediaPage";
import LoadingPage from "./pages/LoadingPage";
import LoadingPageForLive from "./pages/LoadingPageForLive";
import MainPage from "./pages/MainPage";
import QuestionPage from "./pages/QuestionPage";
import RecordingPage from "./pages/RecordingPage";
import ReportPage from "./pages/ReportPage";
import SettingPage from "./pages/SettingPage";
import { UploadVideoPage } from "./pages/UploadVideoPage";
import DummyReportPage from "./pages/dummyReport";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/checkMedia" element={<CheckMediaPage />} />
        <Route path="/questions" element={<QuestionPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/recording" element={<RecordingPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/upload" element={<UploadVideoPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/loading-live" element={<LoadingPageForLive />} />
        <Route path="/dummy" element={<DummyReportPage />} />
      </Routes>
    </Router>
  );
};
export default App;
