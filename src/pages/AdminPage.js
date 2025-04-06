import React from "react";
import "../css/AdminPage.css";
import TopNavBar from "../container/TopNavBar";
import LeftSelector from "../container/LeftSelector";
import RightPanel from "../container/RightPanel";

const AdminPage = () => {
  return (
    <div className="admin-page">
      <TopNavBar />
      <div className="main-content">
        <div className="left-panel">
          <LeftSelector />
        </div>
        <div className="right-panel">
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
