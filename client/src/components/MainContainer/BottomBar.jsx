import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";

export default function BottomBar() {
  return (
    <div className="bottom-bar">
      <PlusIcon />
      <input type="text" placeholder="Enter message..." className="bottom-bar-input" />
    </div>
  );
}
const PlusIcon = () => <BsPlusCircleFill size="22" className="text-green-500 dark:shadow-lg mx-2 dark:text-primary" />;
