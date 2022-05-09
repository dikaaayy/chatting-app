import TopNavigation from "../TopNavigation/TopNavigation";
import React, { useState, useEffect } from "react";
import BottomBar from "./BottomBar";
import Message from "./Message";
import { useRecoilState } from "recoil";
import { messageListState } from "../../atom/Detail";

export default function MainContainer({ socket }) {
  const [messageList, setMessageList] = useRecoilState(messageListState);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  }, [messageList]);

  console.log(messageList);
  return (
    <div className="content-container">
      <TopNavigation />
      <div className="content-list scrollbar-hide">
        <Message username="Leon" timestamp="one week ago" message={`Lorem ipsum dolor. `} />
        {messageList.map((message) => {
          return <Message key={message.id} username={message.author} timestamp={message.time} message={message.message} />;
        })}
      </div>
      <div className="flex justify-center absolute left-0 bottom-0 w-full h-16 items-center bg-gradient-to-t from-gray-800 to-transparent">
        <BottomBar socket={socket} />
      </div>
    </div>
  );
}
