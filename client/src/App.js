import Channelbar from "./components/ChannelBar/ChannelBar";
import MainContainer from "./components/MainContainer/MainContainer";
import SideBar from "./components/Sidebar/SideBar";

function App() {
  return (
    <div className="flex">
      <SideBar />
      <Channelbar />
      <MainContainer />
    </div>
  );
}

export default App;
