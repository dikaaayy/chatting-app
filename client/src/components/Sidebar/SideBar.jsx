import { BsPlus, BsGearFill } from "react-icons/bs";
import { FaFire } from "react-icons/fa";
import SideBarIcon from "./SideBarIcon";
import { MdSearch } from "react-icons/md";
import { IoIosCellular } from "react-icons/io";

const SideBar = () => {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-[8vh] flex flex-col
                  bg-white dark:bg-discordBg-sideBar z-20 shadow-lg"
    >
      <SideBarIcon icon={<FaFire size="28" />} />
      <hr className="sidebar-hr" />
      <SideBarIcon icon={<BsPlus size="32" />} />
      <SideBarIcon icon={<MdSearch size="28" />} />
      <SideBarIcon icon={<IoIosCellular size="27" />} />
      <hr className="sidebar-hr" />
      <SideBarIcon icon={<BsGearFill size="22" />} />
    </div>
  );
};

export default SideBar;
