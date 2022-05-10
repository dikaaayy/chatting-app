import React from "react";
import ChannelBlock from "./ChannelBlock";
import Dropdown from "./Dropdown";
import { userInfoState, userRoomState } from "../../atom/Detail";
import { useRecoilValue } from "recoil";
import { uid } from "uid/single";
import { MdMic, MdHeadphones } from "react-icons/md";
import { BsFillGearFill } from "react-icons/bs";

const SubChannel = [
  {
    name: "General",
    id: String(uid(15)),
  },
];

const ChannelBar = () => {
  const userInfo = useRecoilValue(userInfoState);
  const userRoom = useRecoilValue(userRoomState);
  return (
    <div className="channel-bar">
      <ChannelBlock roomName={userRoom} />
      <div className="channel-container">
        <Dropdown header="Text Channel" selections={SubChannel} />
      </div>
      <div className="current-user-container">
        <div className="flex items-center gap-x-3 basis-3/4 xl:basis-2/3 h-full pl-2 overflow-hidden">
          <img className="w-9 h-9 rounded-full bg-white" src={userInfo.image_url} alt={userInfo.name} />
          <p className="font-semibold text-white">{userInfo.name}</p>
        </div>
        <div className="flex items-center justify-center text-discordText-inputText gap-x-1 h-full relative basis-1/4 xl:basis-1/3 w-full">
          <button className="hover:opacity-70 hover:rounded-full flex items-center justify-center">
            <MdMic className="text-xl" />
          </button>
          <button className="hover:opacity-70 hover:rounded-full flex items-center justify-center">
            <MdHeadphones className="ml-[0.1rem] text-xl" />
          </button>
          <button className="hover:opacity-70 hover:rounded-full flex items-center justify-center ml-1">
            <BsFillGearFill className="text-base" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelBar;
