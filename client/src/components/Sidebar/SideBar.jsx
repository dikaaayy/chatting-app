import { BsGearFill } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import SideBarIcon from "./SideBarIcon";
import { userRoomState } from "../../atom/Detail";
import { useRecoilValue } from "recoil";

const SideBar = () => {
  const userRoom = useRecoilValue(userRoomState);
  // console.log(userRoom);
  return (
    <div
      className="h-screen sm:w-[15vw] md:w-[12vw] lg:w-[7vw] 2xl:w-[5vw] flex-col
                  bg-white dark:bg-discordBg-sideBar z-20 shadow-lg hidden md:flex"
    >
      <SideBarIcon icon={<FaDiscord size="28" />} />
      <hr className="sidebar-hr" />
      <SideBarIcon hoverText={userRoom} icon={userRoom} />
      <SideBarIcon icon={<BsGearFill size="22" />} />
    </div>
  );
};

export default SideBar;
