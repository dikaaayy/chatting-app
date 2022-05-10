import { FaSearch, FaHashtag, FaRegBell, FaUserCircle } from "react-icons/fa";

export default function TopNavigation() {
  return (
    <div className="top-navigation select-none">
      <FaHashtag size="20" className="title-hashtag" />
      <h5 className="title-text">General</h5>
      <Search />
      <FaRegBell size="24" className="top-navigation-icon" />
      <FaUserCircle size="24" className="top-navigation-icon" />
    </div>
  );
}

const Search = () => (
  <div className="search">
    <input className="search-input" type="text" placeholder="Search..." />
    <FaSearch size="18" className="text-secondary my-auto" />
  </div>
);
