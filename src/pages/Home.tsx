import "../assets/styles/border.css";

import Header from "../components/main-components/Header";
import CurrentDevice from "../components/home-components/CurrentDevice";
import AccessHistory from "../components/home-components/AccessHistory";
import ItemList from "../components/home-components/ItemList";
import Item from "../components/home-components/Item";
import ItemHistory from "../components/home-components/ItemHistory";

const Home = () => {
  return (
    <div className="h-screen max-h-screen flex flex-col">
      <Header />
      <div className="content flex flex-grow overflow-hidden">
        <div className="left-section w-[20%] h-full flex flex-col bg-white box-border">
          <CurrentDevice />
          <AccessHistory />
        </div>
        <div className="middle-section w-[20%] h-full flex flex-col bg-white box-border">
          <ItemList />
        </div>
        <div className="right-section w-[60%] h-full flex flex-col bg-white box-border">
          <Item />
          <ItemHistory />
        </div>
      </div>
    </div>
  );
};

export default Home;
