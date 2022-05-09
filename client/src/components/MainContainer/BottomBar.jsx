import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import { userMessageState, userRoomState, messageListState, userInfoState } from "../../atom/Detail";
import { uid } from "uid/single";

export default function BottomBar({ socket }) {
  const [userMessage, setUserMessage] = useRecoilState(userMessageState);
  const userRoom = useRecoilValue(userRoomState);
  const userInfo = useRecoilValue(userInfoState);
  const [messageList, setMessageList] = useRecoilState(messageListState);
  const messageHandler = (e) => {
    setUserMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (userMessage !== "") {
      const messageData = {
        id: String(uid(50)),
        room: userRoom,
        sender_name: userInfo.name,
        message: userMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setUserMessage("");
    }
  };

  return (
    <div className="bottom-bar">
      <button className="bg-slate-300 w-14 h-full" onClick={sendMessage}>
        SEND
      </button>
      <input onChange={messageHandler} type="text" value={userMessage} placeholder="Enter message..." className="bottom-bar-input" />
    </div>
  );
}
const PlusIcon = () => <BsPlusCircleFill size="22" className="text-green-500 dark:shadow-lg mx-2 dark:text-primary" />;
