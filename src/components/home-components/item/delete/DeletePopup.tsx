import AccountType from "../../../../types/item";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { apiCall, ApiEndpoints } from "../../../../utils";
import { useLayoutEffect } from "react";
import StatusPopup from "../../../status-popup/StatusPopup";
import { RootState } from "../../../../store";
import { itemActions } from "../../../../store/item.slice";
// import { queryClient } from "../../../../App";

interface DeletePopup {
  closeModal(): void;
}

const DeletePopup: React.FC<DeletePopup> = ({ closeModal }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const cachedItems = queryClient.getQueryData<AccountType[]>(["items"]) || [];
  const firstItem = cachedItems.length > 0 ? cachedItems[0] : undefined;
  const secondItem = cachedItems.length > 1 ? cachedItems[1] : undefined;

  const item = useSelector((state: RootState) => state.item.selectedItem);

  const deleteXLock = item && item.name === "XLock";

  console.log("xlock", deleteXLock);

  const { mutate, isError, isSuccess } = useMutation({
    mutationFn: apiCall<null>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });

      setTimeout(() => {
        if (firstItem) {
          // Ensure firstItem is defined before using it
          if (item && item.id === firstItem.id) {
            dispatch(itemActions.selectItem(secondItem || firstItem)); // Fallback to firstItem if secondItem is undefined
          } else {
            dispatch(itemActions.selectItem(firstItem));
          }
        }
      }, 700);
    },
  });
  const handleDelete = () => {
    mutate({
      endpoint: `${ApiEndpoints.DeleteItem}${item?.id}`,
      method: "DELETE",
    });
  };

  useLayoutEffect(() => {
    if (isSuccess || isError || deleteXLock) {
      const timer = setTimeout(() => {
        closeModal();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, isError, deleteXLock, closeModal]);

  return (
    <div className="w-[432px] h-fit rounded-[12px] bg-white z-[5] box-shadow overflow-hidden ">
      {isSuccess && <StatusPopup success={true} body="Deleted successfully" />}
      {isError && <StatusPopup success={false} body="Fail to delete item" />}
      {deleteXLock && (
        <StatusPopup success={false} body="You cannot delete XLock item." />
      )}
      {!isSuccess && !isError && !deleteXLock && (
        <>
          <div className="header h-[48px] w-full bg-[#FAE5E1] flex items-center px-[20px] justify-between">
            <p className="title text-[#D43F21]">Delete item</p>
            <div
              className="w-[24px] h-[24px] flex justify-center items-center"
              onClick={closeModal}
            >
              <img src="src/assets/images/Close.png" alt="Close" className="" />
            </div>
          </div>
          <div className="content p-[20px] flex flex-col gap-[28px]">
            <div className="flex flex-col items-center">
              <p className="h1">Are you sure?</p>
            </div>
            <p className="body-text font-[500] text-center">
              This item will be deleted permanently
            </p>
            <button
              className="button-2-fill w-full h-[40px] bg-[#D43F21] border-none"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeletePopup;
