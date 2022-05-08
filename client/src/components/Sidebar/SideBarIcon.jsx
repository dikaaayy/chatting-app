import React from "react";

export default function SideBarIcon({ icon, text = "channel x" }) {
  return (
    <div className="sidebar-icon group">
      {icon}
      <span class="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
}
