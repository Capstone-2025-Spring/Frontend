import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminPromptPage from "./pages/AdminPromptPage";
import CheckMediaPage from "./pages/CheckMediaPage";
import MainPage from "./pages/MainPage";
import QuestionPage from "./pages/QuestionPage";
import RecordingPage from "./pages/RecordingPage";
import ReportPage from "./pages/ReportPage";
import SettingPage from "./pages/SettingPage";
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
        <Route path="/admin" element={<AdminPromptPage />} />
      </Routes>
    </Router>
  );
};
export default App;
