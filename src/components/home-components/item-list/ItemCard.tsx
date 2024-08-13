import "../../../assets/styles/";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/index.ts";
import { itemActions } from "../../../store/item.slice.ts";
import ItemType from "../../../types/item.ts";

const ItemCard: React.FC<ItemType> = (props) => {
  const dispatch = useDispatch();
  const selectedItem = useSelector(
    (state: RootState) => state.item.selectedItem
  );
  const selected = selectedItem.id === props.id;

  const handleSelectItem = () => {
    dispatch(itemActions.selectItem({ ...props }));
  };

  return (
    <div
      className={`device-card w-full h-[50px] ${
        selected ? "bg-[#EFF0F0]" : "bg-white"
      } flex items-center justify-between hover:bg-[#EFF0F0] p-[12px]`}
      onClick={handleSelectItem}
    >
      <div className="flex h-full items-center gap-[12px]">
        <div className="w-[32px] h-[32px] flex justify-center">
          <img
            src={`${
              props.logo_url
                ? props.logo_url
                : "/images/DefaultLogo.png"
            }`}
            alt="DefaultLogo"
            className=""
          />
        </div>
        <div className="flex flex-col">
          <p className="body-text-bold">{props.name}</p>
          <p className="body-text">account {props.order}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
