import { BsGearFill } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import SideBarIcon from "./SideBarIcon";
import { userInfoState } from "../../atom/Detail";
import { useRecoilValue } from "recoil";

const SideBar = () => {
  const userInfo = useRecoilValue(userInfoState);
  // console.log(userRoom);
  return (
    <div
      className="h-screen sm:w-[15vw] md:w-[12vw] lg:w-[7vw] 2xl:w-[4vw] flex-col
                  bg-white dark:bg-discordBg-sideBar z-20 shadow-lg hidden md:flex"
    >
      <SideBarIcon icon={<FaDiscord size="28" />} />
      <hr className="sidebar-hr" />
      <SideBarIcon hoverText={userInfo.user_room} icon={userInfo.user_room} />
      <SideBarIcon icon={<BsGearFill size="22" />} />
    </div>
  );
};

export default SideBar;
