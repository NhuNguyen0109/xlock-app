import "../../../assets/styles";

interface MenuPopupOptions {
  setOption: (option: string) => void;
}

const MenuPopup: React.FC<MenuPopupOptions> = ({ setOption }) => {
  return (
    <div className="w-[190px] h-fit bg-white box-shadow rounded-[8px] py-[16px] flex flex-col gap-[8px]">
      <div
        className="flex gap-[8px] w-full h-full py-[8px] px-[16px] hover:cursor-pointer hover:bg-[#EFF0F0]"
        onClick={() => setOption("edit")}
      >
        <div className="w-[16px] h-[16px] flex justify-center">
          <img src="src/assets/images/Edit.png" alt="Edit" className="" />
        </div>
        <p className="body-text">Edit</p>
      </div>
      <div
        className="flex gap-[8px] w-full h-full py-[8px] px-[16px] hover:cursor-pointer hover:bg-[#EFF0F0]"
        onClick={() => setOption("share")}
      >
        <div className="w-[16px] h-[16px] flex justify-center">
          <img src="src/assets/images/Share.png" alt="Share" className="" />
        </div>
        <p className="body-text">Share</p>
      </div>
      <div
        className="flex gap-[8px] w-full h-full py-[8px] px-[16px] hover:cursor-pointer hover:bg-[#EFF0F0]"
        onClick={() => setOption("delete")}
      >
        <div className="w-[16px] h-[16px] flex justify-center">
          <img
            src="src/assets/images/Trash_bin.png"
            alt="Delete"
            className=""
          />
        </div>
        <p className="body-text">Delete</p>
      </div>
    </div>
  );
};

export default MenuPopup;
