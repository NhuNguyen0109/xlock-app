import "../../../../assets/styles/";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { RootState } from "../../../../store/index.ts";
import InputFieldCreate from "../../../input-field/InputFieldCreate.tsx";
import AccountType from "../../../../types/item.ts";
import { useMutation } from "@tanstack/react-query";
import { apiCall, ApiEndpoints } from "../../../../utils/index.ts";
import CreateItemType from "../../../../types/create-item.ts";
import requestEncrypt from "../../../../utils/browserCall/request.encrypt.key.ts";
import StatusPopup from "../../../status-popup/StatusPopup.tsx";
import useModal from "../../../../utils/useModal.ts";
import { itemActions } from "../../../../store/item.slice.ts";

const defaultAccount: AccountType = {
  id: "",
  name: "",
  site: "",
  description: "",
  enc_credentials: "",
  added_at: "",
  updated_at: "",
  logo_url: "",
  type: "",
};

interface CreateItem {
  cancel(): void;
}

const CreateItem: React.FC<CreateItem> = ({ cancel }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const cachedItems = queryClient.getQueryData<AccountType[]>(["items"]) || [];
  const firstItem = cachedItems.length > 0 ? cachedItems[0] : undefined;

  const selectedItem = useSelector(
    (state: RootState) => state.item.selectedItem
  );
  const {
    isOpen: isOpenSuccess,
    modalRef: modalRefSuccess,
    closeModal: closeModalSuccess,
    openModal: openModalSuccess,
  } = useModal();
  const {
    isOpen: isOpenError,
    modalRef: modalRefError,
    closeModal: closeModalError,
    openModal: openModalError,
  } = useModal();
  const [isCompleteForm, setIsCompleteForm] = useState<boolean>(true);

  const { mutate, isError } = useMutation({
    mutationFn: apiCall<AccountType, CreateItemType>,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      openModalSuccess();
      setTimeout(() => {
        dispatch(itemActions.selectItem(data.data));
        closeModalSuccess();
        cancel();
      }, 700);
    },
  });

  if (isError) console.log("Failed to create item.");

  const [formData, setFormData] = useState({
    name: "",
    credential: "",
    password: "",
    site: "",
  });

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (!isCompleteForm) {
      openModalError();
      const timer = setTimeout(() => {
        closeModalError();
        setIsCompleteForm(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isCompleteForm]);

  const handleSave = async () => {
    const mixedData = hasMixedData(formData);
    if (mixedData) setIsCompleteForm(false);
    else {
      if (Object.values(formData).every((value) => value.trim() === ""))
        handleNothingChanged();
      else {
        let requestData: CreateItemType = {
          name: formData.name,
          enc_credentials: "",
          site: formData.site,
          description: "",
          logo_url: "",
        };

        const { encrypted } = await requestEncrypt(
          `${formData.credential}::${formData.password}`
        );
        requestData.enc_credentials = encrypted || "";

        mutate({
          endpoint: ApiEndpoints.CreateItem,
          method: "POST",
          requestData,
        });
      }
    }
  };

  const handleNothingChanged = () => {
    dispatch(itemActions.selectItem(firstItem || defaultAccount));
    cancel();
  };

  return (
    <>
      {isOpenSuccess && (
        <div className="blur-bg">
          <div
            className="absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4"
            ref={modalRefSuccess}
          >
            <StatusPopup
              success={true}
              body="Created successfully"
              container={true}
            />
          </div>
        </div>
      )}
      {isOpenError && (
        <div className="blur-bg z-[2000]">
          <div
            className="absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4"
            ref={modalRefError}
          >
            <StatusPopup
              success={false}
              body="All fields must be filled"
              container={true}
            />
          </div>
        </div>
      )}

      <div className="header w-full h-[90px] bg-white flex items-center justify-between p-[20px] card-border">
        <div className="h-full flex items-center gap-[20px] ">
          <div className="w-[48px] h-[48px] flex justify-center">
            <img
              src={`${
                selectedItem?.logo_url
                  ? selectedItem?.logo_url
                  : "/images/DefaultLogo.png"
              }`}
              alt="DefaultLogo"
            />
          </div>
          <div className="flex flex-col">
            <input
              id="name"
              autoFocus
              className="text-black text-2xl not-italic font-semibold leading-[normal] rounded-[6px]
                          focus:outline-[#0570EB] focus:bg-[#E6F1FD] border-solid border-[2px] border-[#D1D3D3]"
              value={formData.name}
              onChange={(event) => handleChangeValue?.(event)}
            />
          </div>
        </div>
        <div className=" flex justify-center items-center">
          <button
            className="button-1-empty border-none px-[16px]"
            onClick={handleNothingChanged}
          >
            Cancel
          </button>
          <button
            className="button-1-fill py-[8px] px-[16px] rounded-[8px]"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
      <div className="body w-full flex flex-col items-center overflow-auto">
        <div className="info-section w-fit flex flex-col items-center my-[4px]">
          <div className="w-full pl-[120px] py-[8px] border-solid border-b-[1px] border-[#D9D9D9] flex justify-between items-center">
            <p className="body-text-bold">Account</p>
          </div>
          <div className="flex flex-col gap-[4px] my-[4px]">
            <InputFieldCreate
              type="credential"
              title="Credentials"
              value={formData.credential}
              handleChangeValue={handleChangeValue}
            />
            <InputFieldCreate
              type="password"
              title="Password"
              value={formData.password}
              handleChangeValue={handleChangeValue}
            />
          </div>
        </div>
        <div className="info-section w-fit flex flex-col items-center my-[4px]">
          <div className="w-full pl-[120px] py-[8px] border-solid border-b-[1px] border-[#D9D9D9]">
            <p className="body-text-bold">Website</p>
          </div>
          <div className="flex flex-col gap-[4px] my-[4px]">
            <InputFieldCreate
              type="site"
              title=""
              value={formData.site}
              handleChangeValue={handleChangeValue}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const hasMixedData = (data: { [key: string]: string }) => {
  const values = Object.values(data);
  const hasData = values.some((value) => value.trim() !== "");
  const hasEmpty = values.some((value) => value.trim() === "");

  return hasData && hasEmpty;
};

export default CreateItem;
