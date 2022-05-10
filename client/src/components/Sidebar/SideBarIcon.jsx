import React from "react";

export default function SideBarIcon({ icon, hoverText }) {
  const hoverState = (hoverText) => {
    if (hoverText) {
      return "group-hover:scale-100";
    }
  };
  return (
    <div className="sidebar-icon group font-semibold text-2xl">
      {icon}
      <span className={`sidebar-tooltip ${hoverState(hoverText)}`}>Room {hoverText}</span>
    </div>
  );
}
