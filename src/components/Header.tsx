import React from "react";

const Header: React.FC = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="header">
      <div className="headerTop">
        <span className="headerIcon">📅</span>
        <h1>Pranav's Personal Scheduler</h1>
      </div>
      <p className="headerDate">{today}</p>
    </div>
  );
};

export default Header;
