import React from "react";
import { HiHashtag } from "react-icons/hi";

export default function Blank() {
  return (
    <>
      <div className="w-20 mb-4 h-20 bg-white bg-opacity-10 flex justify-center items-center rounded-full">
        <HiHashtag className="text-white" size={50} />
      </div>
      <p className="text-white font-bold text-2xl md:text-4xl lg:text-6xl">There is no message yet</p>
      <p className="font-semibold text-base md:text-xl lg:text-3xl text-[#818181]">Start Chatting Now!</p>
    </>
  );
}
