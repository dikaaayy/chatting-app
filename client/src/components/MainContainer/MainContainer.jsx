import TopNavigation from "../TopNavigation/TopNavigation";
import React, { useEffect } from "react";
import BottomBar from "./BottomBar";
import Message from "./Message";
import { useRecoilState } from "recoil";
import { messageListState } from "../../atom/Detail";
import Blank from "./Blank";
import ScrollToBottom from "react-scroll-to-bottom";

export default function MainContainer({ socket }) {
  const [messageList, setMessageList] = useRecoilState(messageListState);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  }, [messageList]);

  // console.log(messageList);
  // console.log(userInfo);

  return (
    <div className="content-container">
      <TopNavigation socket={socket} />
      {messageList.length === 0 ? (
        <div className="ml-10 flex flex-col justify-center h-screen select-none gap-y-2">
          <Blank />
        </div>
      ) : (
        <ScrollToBottom className="content-list">
          {messageList.map((message) => {
            return <Message key={message.id} content={message} />;
          })}
        </ScrollToBottom>
      )}
      <div className="flex justify-center absolute left-0 bottom-0 w-full h-16 items-center bg-gradient-to-t from-gray-800 to-transparent">
        <BottomBar socket={socket} />
      </div>
    </div>
  );
}
