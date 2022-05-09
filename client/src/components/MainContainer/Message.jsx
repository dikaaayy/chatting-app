import React from "react";
import { useRecoilValue } from "recoil";
import { userNameState } from "../../atom/Detail";

export default function Message({ username, timestamp, message }) {
  const userName = useRecoilValue(userNameState);
  const seed = Math.round(Math.random() * 100);
  return (
    <div className="w-full flex items-start justify-evenly py-4 pr-2 gap-x-2">
      <div className="ml-2">
        <img src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`} alt="" className="avatar w-12" />
      </div>

      <div className="w-[95%] flex flex-col justify-between">
        <div className="flex items-center">
          <p className="text-left font-semibold text-gray-800 dark:text-white cursor-pointer">{username}</p>
          <p className="timestamp">{timestamp}</p>
        </div>
        <p className="text-left text-gray-800 dark:text-white mr-auto whitespace-normal">{message}</p>
      </div>
    </div>
  );
}
