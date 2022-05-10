import React from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../atom/Detail";

export default function Message({ content }) {
  const { sender_name, time, message } = content;
  const userInfo = useRecoilValue(userInfoState);
  const userImage = userInfo.image_url;
  return (
    <div className="w-full flex items-start justify-evenly py-4 pr-2 pl-2 gap-x-2 hover:bg-white hover:bg-opacity-5">
      <div className="">
        <img src={userImage} alt="profpic" className="avatar w-12 select-none" />
      </div>

      <div className="w-[95%] flex flex-col justify-between pr-4">
        <div className="flex items-center">
          <p className="text-left font-semibold text-gray-800 dark:text-white cursor-pointer">{sender_name}</p>
          <p className="timestamp">{time}</p>
        </div>
        <p className="text-left text-gray-800 dark:text-[#f8f7e5]">{message}</p>
      </div>
    </div>
  );
}
