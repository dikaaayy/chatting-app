import React from "react";

export default function Message({ content }) {
  const { sender_name, time, message, sender_img } = content;
  if (sender_name === "ADMIN") {
    return (
      <div className="w-full flex items-start justify-evenly py-4 pr-2 pl-2 gap-x-2 select-none">
        <div className="w-[95%] flex flex-col justify-between items-center">
          <p className="timestamp">{time}</p>
          <p className="text-left text-gray-800 dark:text-discordText-lightGray font-semibold">{message}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full flex items-start justify-evenly py-4 pr-2 pl-2 gap-x-2 hover:bg-white hover:bg-opacity-5">
        <div className="">
          <img src={sender_img} alt="profpic" className="avatar w-12 select-none" />
        </div>

        <div className="w-[95%] flex flex-col justify-between pr-4">
          <div className="flex items-center">
            <p className="text-left font-semibold text-gray-800 dark:text-white cursor-pointer">{sender_name}</p>
            <p className="timestamp select-none">{time}</p>
          </div>
          <p className="text-left text-gray-800 dark:text-[#f8f7e5]">{message}</p>
        </div>
      </div>
    );
  }
}
