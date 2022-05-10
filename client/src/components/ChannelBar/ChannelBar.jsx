import React from "react";
import ChannelBlock from "./ChannelBlock";
import Dropdown from "./Dropdown";
import { userInfoState, userRoomState } from "../../atom/Detail";
import { useRecoilValue } from "recoil";
import { uid } from "uid/single";

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
        <img className="w-10 h-10 rounded-full bg-white" src={userInfo.image_url} alt={`${userInfo.name}-image`} />
        <p className="font-semibold text-white">{userInfo.name}</p>
      </div>
    </div>
  );
};

export default ChannelBar;
