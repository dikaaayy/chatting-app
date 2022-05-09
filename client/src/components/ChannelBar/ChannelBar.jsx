import React from "react";
import ChannelBlock from "./ChannelBlock";
import Dropdown from "./Dropdown";
import { userInfoState } from "../../atom/Detail";
import { useRecoilValue } from "recoil";

const Gaming = ["PUBG", "CS"];
const questions = ["NodeJS", "NextJS", "VueJS"];
const random = ["Meme", "Playlist"];

const ChannelBar = () => {
  const userInfo = useRecoilValue(userInfoState);
  return (
    <div className="channel-bar shadow-lg relative z-0 select-none">
      <ChannelBlock />
      <div className="channel-container">
        <Dropdown header="Gaming" selections={Gaming} />
        <Dropdown header="Q&A" selections={questions} />
        <Dropdown header="Random" selections={random} />
      </div>
      <div className="w-full pl-5 min-h-max h-[7%] bottom-0 bg-discordBg-userBar absolute flex gap-x-3 items-center">
        <img className="w-10 h-10 rounded-full bg-white" src={userInfo.image_url} alt={`${userInfo.name}-image`} />
        <p className="font-semibold text-white">{userInfo.name}</p>
      </div>
    </div>
  );
};

export default ChannelBar;
