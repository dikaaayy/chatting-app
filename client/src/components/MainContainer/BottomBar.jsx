import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userMessageState, userRoomState, messageListState, userInfoState } from "../../atom/Detail";
import { uid } from "uid/single";
import { RiSendPlaneFill } from "react-icons/ri";

export default function BottomBar({ socket }) {
  const [userMessage, setUserMessage] = useRecoilState(userMessageState);
  const userRoom = useRecoilValue(userRoomState);
  const userInfo = useRecoilValue(userInfoState);
  const [messageList, setMessageList] = useRecoilState(messageListState);
  const messageHandler = (e) => {
    setUserMessage(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
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
      <form onSubmit={sendMessage} className="flex w-full mr-3">
        <input onChange={messageHandler} type="text" value={userMessage} spellCheck="false" placeholder="Enter message..." className="bottom-bar-input" />
        <button className="w-5" type="submit">
          <RiSendPlaneFill size={25} className="text-gray-400" />
        </button>
      </form>
    </div>
  );
}
