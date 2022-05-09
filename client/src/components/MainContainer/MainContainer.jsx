import TopNavigation from "../TopNavigation/TopNavigation";
import React, { useEffect } from "react";
import BottomBar from "./BottomBar";
import Message from "./Message";
import { useRecoilState, useRecoilValue } from "recoil";
import { messageListState, userInfoState } from "../../atom/Detail";
import Blank from "./Blank";

export default function MainContainer({ socket }) {
  const [messageList, setMessageList] = useRecoilState(messageListState);
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  }, [messageList]);

  console.log(messageList);
  return (
    <div className="content-container">
      <TopNavigation />
      {messageList.length === 0 ? (
        <div className="ml-10 flex flex-col justify-center h-screen select-none gap-y-4">
          <Blank />
        </div>
      ) : (
        <div className="content-list scrollbar-hide">
          {messageList.map((message) => {
            return <Message key={message.id} username={message.sender_name} timestamp={message.time} message={message.message} image_url={userInfo.image_url} />;
          })}
        </div>
      )}
      <div className="flex justify-center absolute left-0 bottom-0 w-full h-16 items-center bg-gradient-to-t from-gray-800 to-transparent">
        <BottomBar socket={socket} />
      </div>
    </div>
  );
}
