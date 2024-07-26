import "../../assets/styles/border.css";
import "../../assets/styles/text.css";
import { useSelector } from "react-redux";
import { useState, useLayoutEffect } from "react";
import { RootState } from "../../store/index.ts";
import InputFieldDisabled from "../input-field/InputFieldDisabled.tsx";

const Item = () => {
  const [isReveal, setIsReveal] = useState(false);
  const selectedItem = useSelector(
    (state: RootState) => state.item.selectedItem
  );

  useLayoutEffect(() => {
    setIsReveal(false);
  }, [selectedItem]);

  return (
    <div className="item-section flex flex-col flex-grow   items-center">
      <div className="header w-full h-[90px] bg-white flex items-center justify-between p-[20px] card-border">
        <div className="h-full flex items-center gap-[20px] ">
          <div className="w-[48px] h-[48px] flex justify-center">
            <img
              src={`${
                selectedItem.imageUrl
                  ? selectedItem.imageUrl
                  : "src/assets/images/DefaultLogo.png"
              }`}
              alt="DefaultLogo"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-black text-2xl not-italic font-semibold leading-[normal]">
              {selectedItem.name}
            </p>
            <div className="flex gap-[2px]">
              <p className="text-black text-sm not-italic font-normal leading-[normal]">
                {selectedItem.account}
              </p>
              <p className="text-[#767C7C] text-sm not-italic font-normal leading-[normal]">
                {selectedItem.shared
                  ? "| Item shared by " + selectedItem.shared
                  : null}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[32px] h-[32px] flex justify-center items-center">
          <img src="src/assets/images/More.png" alt="More" className="" />
        </div>
      </div>
      <div className="body flex flex-col items-center overflow-auto">
        <div className="info-section w-fit flex flex-col items-center my-[4px]">
          <div className="w-full pl-[120px] py-[8px] border-solid border-b-[1px] border-[#D9D9D9] flex justify-between items-center">
            <p className="body-text-bold">Account</p>
            <button
              className="text-[#29428D] text-xs not-italic font-medium leading-[normal] rounded-[4px] py-[4px] px-[8px] border-solid border-[2px] border-[#29428D]"
              onClick={() => setIsReveal(!isReveal)}
            >
              {!isReveal ? "Reveal" : "Hide"}
            </button>
          </div>
          <div className="flex flex-col gap-[4px] my-[4px]">
            <InputFieldDisabled
              title="Credentials"
              value={isReveal ? selectedItem.credentials : "*****"}
              src="src/assets/images/Copy.png"
              alt="Copy"
              actualValue={selectedItem.credentials}
            />
            <InputFieldDisabled
              title="Password"
              value={isReveal ? selectedItem.password : "*****"}
              src="src/assets/images/Copy.png"
              alt="Copy"
              actualValue={selectedItem.password}
            />
          </div>
        </div>
        <div className="info-section w-fit flex flex-col items-center my-[4px]">
          <div className="w-full pl-[120px] py-[8px] border-solid border-b-[1px] border-[#D9D9D9]">
            <p className="body-text-bold">Website</p>
          </div>
          <div className="flex flex-col gap-[4px] my-[4px]">
            <InputFieldDisabled
              title=""
              value={selectedItem.url || ""}
              src="src/assets/images/Link.png"
              alt="Link"
            />
          </div>
        </div>
        <div className="info-section w-fit flex flex-col items-center my-[4px]">
          <div className="w-full pl-[120px] py-[8px] border-solid border-b-[1px] border-[#D9D9D9]">
            <p className="body-text-bold">Modification</p>
          </div>
          <div className="flex flex-col gap-[4px] my-[4px]">
            <InputFieldDisabled
              title="Created"
              value={selectedItem.added_time || ""}
            />
            <InputFieldDisabled
              title="Modified"
              value={selectedItem.updated_time || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
