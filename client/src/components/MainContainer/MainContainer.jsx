import TopNavigation from "../TopNavigation/TopNavigation";
import React, { useEffect, useRef } from "react";
import BottomBar from "./BottomBar";
import Message from "./Message";
import { useRecoilState, useRecoilValue } from "recoil";
import { messageListState, userInfoState } from "../../atom/Detail";
import Blank from "./Blank";
import ScrollToBottom from "react-scroll-to-bottom";

export default function MainContainer({ socket }) {
  const [messageList, setMessageList] = useRecoilState(messageListState);
  const scrollBottom = useRef(null);
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    if (scrollBottom.current) {
      scrollBottom.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messageList]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  }, [messageList]);

  // console.log(messageList);
  return (
    <div className="content-container">
      <TopNavigation />
      {messageList.length === 0 ? (
        <div className="ml-10 flex flex-col justify-center h-screen select-none gap-y-2">
          <Blank />
        </div>
      ) : (
        <ScrollToBottom className="content-list">
          {messageList.map((message) => {
            return <Message key={message.id} username={message.sender_name} timestamp={message.time} message={message.message} image_url={userInfo.image_url} />;
          })}
        </ScrollToBottom>
      )}
      <div className="flex justify-center absolute left-0 bottom-0 w-full h-16 items-center bg-gradient-to-t from-gray-800 to-transparent">
        <BottomBar socket={socket} />
      </div>
    </div>
  );
}
