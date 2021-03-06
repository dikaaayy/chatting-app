import TopNavigation from "../TopNavigation/TopNavigation";
import React, { useEffect } from "react";
import BottomBar from "./BottomBar";
import Message from "./Message";
import { useRecoilState, useRecoilValue } from "recoil";
import { messageListState, userInfoState } from "../../atom/Detail";
import Blank from "./Blank";
import ScrollToBottom from "react-scroll-to-bottom";
import { uid } from "uid/single";

export default function MainContainer({ socket }) {
  const [messageList, setMessageList] = useRecoilState(messageListState);
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  }, [messageList]);

  const userDcNotification = {
    id: String(uid(13)),
    room: userInfo.user_room,
    sender_name: "ADMIN",
    message: `${userInfo.name} disconnected`,
    time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
  };

  // console.log(messageList);
  // console.log(userInfo.user_room);

  const testHandler = () => {
    socket.emit("user_dc", userInfo.user_room, userDcNotification);
  };

  return (
    <div className="content-container">
      {/*<button onClick={testHandler} className="text-white border-2">
        test
      </button> */}

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
