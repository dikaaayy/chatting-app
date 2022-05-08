import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import React from "react";

export default function ChevronIcon({ expanded }) {
  const chevClass = "text-accent text-opacity-80 my-auto mr-1";
  return expanded ? <FaChevronDown size="14" className={chevClass} /> : <FaChevronRight size="14" className={chevClass} />;
}
