import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RecordingPage from "./pages/RecordingPage";
import MainPage from "./pages/MainPage";
import QuestionPage from "./pages/QuestionPage";
import ReportPage from "./pages/ReportPage";
import SettingPage from "./pages/SettingPage";
import CheckMediaPage from "./pages/CheckMediaPage";

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
      </Routes>
    </Router>
  );
};
export default App;
