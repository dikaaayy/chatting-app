import { set } from "express/lib/application";
import { useState } from "react";
import { FaHashtag, FaRegBell, FaUserCircle } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../atom/Detail";

export default function TopNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [newRoom, setNewRoom] = useState("");
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const openHandler = () => {
    setIsOpen(true);
  };
  const closeHandler = () => {
    setIsOpen(false);
    setNewRoom("");
  };

  const changeRoom = (e) => {
    e.preventDefault();
    setUserInfo((prevState) => {
      return {
        ...prevState,
        user_room: newRoom,
      };
    });
    closeHandler();
    console.log("room changed");
  };
  return (
    <div className="top-navigation select-none transition-all">
      <FaHashtag size="20" className="title-hashtag" />
      <h5 className="title-text">General</h5>
      <button onClick={openHandler} className={`text-discordText-lightGray bg-discordBg-sideBar font-semibold px-3 py-2 rounded shadow-md ${isOpen ? "hidden" : "block"}`}>
        Change Room
      </button>
      <div className={`search ${!isOpen ? "hidden" : "flex"}`}>
        <form onSubmit={changeRoom} className="flex">
          <input
            className="search-input"
            type="text"
            placeholder="Insert New Room"
            onChange={(e) => {
              setNewRoom(e.target.value);
            }}
            value={newRoom || ""}
          />
          <button onSubmit={changeRoom} className={`px-2 font-semibold py-1 rounded-md bg-discordBg-channelContainer ${newRoom === "" ? "hidden" : "block"}`} type="submit">
            Go
          </button>
        </form>
        <VscChromeClose size="18" className={`text-secondary my-auto mr-2 ${newRoom === "" ? "block" : "hidden"}`} onClick={closeHandler} />
      </div>
      <FaRegBell size="24" className="top-navigation-icon" />
      <FaUserCircle size="24" className="top-navigation-icon" />
    </div>
  );
}
