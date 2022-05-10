import React, { useState } from "react";
import Channelbar from "./ChannelBar/ChannelBar";
import MainContainer from "./MainContainer/MainContainer";
import SideBar from "./Sidebar/SideBar";
import ReCAPTCHA from "react-google-recaptcha";
import io from "socket.io-client";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState, userRoomState } from "../atom/Detail";

const socket = io.connect("http://localhost:3000/");
const rand = Math.floor(Math.random() * 10);

export default function Landing() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [name, setName] = useState("");
  const [isNameFilled, setIsNameFilled] = useState(false);
  const userRoom = useRecoilValue(userRoomState);
  const [isVerified, setIsVerified] = useState(false);

  const captchaHandler = (value) => {
    console.log(value);
    setIsVerified(true);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (name === "") {
      return;
    }
    if (!isVerified) {
      return;
    }
    socket.emit("join_room", userRoom);
    setUserInfo({
      name,
      image_url: `https://avatars.dicebear.com/api/open-peeps/${rand}.svg`,
    });
    setIsNameFilled(true);
  };

  if (isNameFilled) {
    return (
      <div className="flex w-screen">
        <SideBar />
        <Channelbar />
        <MainContainer socket={socket} />
      </div>
    );
  } else {
    return (
      <div className="flex rounded-lg justify-center items-center flex-col h-[50vh] min-w-max w-1/2 bg-[#2E3036] text-white">
        <form onSubmit={submitHandler} className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <label className="font-semibold text-[#B9BBBE]">Name:</label>
            <input className="pl-2 py-2 outline-none rounded bg-[#1b1b1b] placeholder:font-semibold" type="text" placeholder="Set Your Name" onChange={nameHandler} value={name} spellCheck="false" />
          </div>
          <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} onChange={captchaHandler} />
          <button className={`px-3 py-2 bg-discordPurple font-semibold transition rounded-md hover:bg-opacity-95 disabled:bg-[#535353]`} disabled={!name || !isVerified} type="submit">
            Enter
          </button>
        </form>
      </div>
    );
  }
}
