import "../../../assets/styles";

const EmptyItem = () => {
  return (
    <div className="size-full flex flex-col pt-[100px] items-center gap-[48px]">
      <div className="w-[274px] h-[214px]">
        <img src="src/assets/images/EmptyItem.png" alt="EmptyItem" />
      </div>
      <p className="body-text-bold text-[28px] pl-[24px]">
        There is no item yet
      </p>
    </div>
  );
};

export default EmptyItem;
