import "../assets/styles/border.css";
import useModal from "../utils/useModal";
import Header from "../components/main-components/Header";
import CurrentDevice from "../components/home-components/device/CurrentDevice";
import AccessHistory from "../components/home-components/history/AccessHistory";
import ItemList from "../components/home-components/item-list/ItemList";
import Item from "../components/home-components/item/Item";
import ItemHistory from "../components/home-components/item-history/ItemHistory";
import DeviceBrowserHistory from "../components/home-components/device/DeviceBrowserHistory";

const Home = () => {
  const { isOpen, openModal, closeModal, modalRef } = useModal();

  return (
    <div className={`h-screen max-h-screen flex flex-col`}>
      <Header />
      <div className="content flex flex-grow overflow-hidden">
        {isOpen && (
          <div className="blur-bg">
            <div
              className="absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4"
              ref={modalRef}
            >
              <DeviceBrowserHistory closeModal={closeModal} />
            </div>
          </div>
        )}
        <div className="left-section w-[20%] h-full flex flex-col bg-white box-border">
          <CurrentDevice openModal={openModal} />
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
