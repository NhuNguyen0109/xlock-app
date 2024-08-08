import AccountType from "../../../../types/item";
import { useMutation } from "@tanstack/react-query";
import { apiCall } from "../../../../utils";
import { useLayoutEffect } from "react";
import StatusPopup from "../../../status-popup/StatusPopup";
import { queryClient } from "../../../../App";

interface DeletePopup {
  closeModal(): void;
  item: AccountType | null;
}

const DeletePopup: React.FC<DeletePopup> = ({ closeModal, item }) => {
  const { mutate, isError, isSuccess } = useMutation({
    mutationFn: apiCall<null>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const handleDelete = () => {
    mutate({
      endpoint: `/api/v1/items/delete/${item?.id}`,
      method: "DELETE",
    });
  };

  useLayoutEffect(() => {
    if (isSuccess || isError) {
      const timer = setTimeout(() => {
        closeModal();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, isError, closeModal]);

  return (
    <div className="w-[432px] h-fit rounded-[12px] bg-white z-[5] box-shadow overflow-hidden ">
      {isSuccess && <StatusPopup success={true} body="Shared successfully" />}
      {isError && <StatusPopup success={false} body="Fail to share item" />}
      {!isSuccess && !isError && (
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
