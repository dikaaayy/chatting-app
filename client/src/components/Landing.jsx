import React, { useState } from "react";
import Channelbar from "./ChannelBar/ChannelBar";
import MainContainer from "./MainContainer/MainContainer";
import SideBar from "./Sidebar/SideBar";
import ReCAPTCHA from "react-google-recaptcha";
import io from "socket.io-client";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState, userRoomState } from "../atom/Detail";

const socket = io.connect("http://localhost:3000/");
const rand = Math.round(Math.random() * 100);

export default function Landing() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [name, setName] = useState("");
  const [isNameFilled, setIsNameFilled] = useState(false);
  const userRoom = useRecoilValue(userRoomState);

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const submitHandler = () => {
    if (name === "") {
      return false;
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
      <div className="flex rounded-lg justify-center items-center flex-col h-[50vh] w-1/2 bg-[#2E3036] text-white">
        <form onSubmit={submitHandler} className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <label className="font-semibold text-[#B9BBBE]">Name:</label>
            <input className="pl-2 py-2 outline-none rounded bg-[#1b1b1b]" type="text" placeholder="Set Your Name" onChange={nameHandler} value={name} />
          </div>
          {/*<ReCAPTCHA sitekey="process.env.SITE_KEY" /> */}
          <button className={`px-3 py-2 bg-[#3d62e7] font-semibold transition rounded-md hover:bg-[#3555c7] disabled:bg-black`} type="submit">
            Enter
          </button>
        </form>
      </div>
    );
  }
}
