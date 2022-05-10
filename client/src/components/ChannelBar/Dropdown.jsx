import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ChevronIcon from "./ChevronIcon";
import { BsHash } from "react-icons/bs";

export default function Dropdown({ header, selections }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="dropdown">
      <div onClick={() => setExpanded(!expanded)} className="dropdown-header">
        <ChevronIcon expanded={expanded} />
        <h5 className={expanded ? "dropdown-header-text-selected" : "dropdown-header-text"}>{header}</h5>
        <FaPlus size="12" className="text-accent text-opacity-80 my-auto ml-auto" />
      </div>
      {expanded &&
        selections &&
        selections.map((selection) => {
          return (
            <div key={selection.id} className="dropdown-selection">
              <BsHash size="24" className="text-gray-400" />
              <h5 className="dropdown-selection-text">{selection.name}</h5>
            </div>
          );
        })}
    </div>
  );
}
