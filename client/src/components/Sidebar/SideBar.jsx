import { BsPlus, BsFillLightningFill, BsGearFill, IoSearch } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";
import SideBarIcon from "./SideBarIcon";
import { MdSearch } from "react-icons/md";

const SideBar = () => {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-[8vh] flex flex-col
                  bg-white dark:bg-discordBg-sideBar z-20 shadow-lg"
    >
      <SideBarIcon icon={<FaFire size="28" />} />
      <hr className="sidebar-hr" />
      <SideBarIcon icon={<BsPlus size="32" />} />
      <SideBarIcon icon={<BsFillLightningFill size="20" />} />
      <SideBarIcon icon={<FaPoo size="20" />} />
      <hr className="sidebar-hr" />
      <SideBarIcon icon={<BsGearFill size="22" />} />
    </div>
  );
};

export default SideBar;
