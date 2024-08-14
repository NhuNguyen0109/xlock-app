import "../../../../assets/styles/";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../../../../store/index.ts";
import InputFieldEdit from "../../../input-field/InputFieldEdit.tsx";
import AccountType, { ShareItemType } from "../../../../types/item.ts";
import getDecryptedCreds, {
  DecryptedCreds,
} from "../../../../utils/decrypt-creds.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCall, ApiEndpoints } from "../../../../utils/index.ts";
import UpdatedItemType from "../../../../types/update-item.ts";
import requestEncrypt from "../../../../utils/browserCall/request.encrypt.key.ts";
// import { queryClient } from "../../../../App.tsx";
import StatusPopup from "../../../status-popup/StatusPopup.tsx";
import useModal from "../../../../utils/useModal.ts";

interface EdittingItem {
  cancel(): void;
}
type FormDataKey = "name" | "credential" | "password" | "site";

const EditItem: React.FC<EdittingItem> = ({ cancel }) => {
  const queryClient = useQueryClient();
  const [decCreds, setDecCreds] = useState<DecryptedCreds>();
  const selectedItem = useSelector(
    (state: RootState) => state.item.selectedItem
  );
  const { isOpen, modalRef, closeModal, openModal } = useModal();

  const { mutate, isError } = useMutation({
    mutationFn: apiCall<null, UpdatedItemType>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      openModal();
      setTimeout(() => {
        closeModal();
        cancel();
      }, 700);
    },
  });

  if (isError) console.log("Failed to update item.");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptCreds = await getDecryptedCreds(
          selectedItem.enc_credentials,
          selectedItem.type
        );
        setDecCreds(decryptCreds);
      } catch (error) {
        console.error("Error fetching decrypted credentials:", error);
      }
    };

    fetchData();
  }, [selectedItem]);

  const [formData, setFormData] = useState({
    name: selectedItem.name,
    credential: decCreds?.credential || "",
    password: decCreds?.password || "",
    site: selectedItem.site,
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

  const hasChanged = (key: FormDataKey) => {
    if (key === "credential" || key === "password") {
      // return false;
      return decCreds?.[key] !== formData[key];
    }
    return selectedItem[key] !== formData[key];
  };

  const handleSave = async () => {
    const updatedData: Partial<UpdatedItemType> = {};

    if (hasChanged("name")) {
      updatedData.name = formData.name;
    }

    if (hasChanged("site")) {
      updatedData.site = formData.site;
    }

    if (hasChanged("credential") || hasChanged("password")) {
      const { encrypted } = await requestEncrypt(
        `${formData.credential}::${formData.password}`
      );
      updatedData.enc_credentials = encrypted;
    }

    if (Object.keys(updatedData).length > 0) {
      mutate({
        endpoint: `${ApiEndpoints.UpdateItem}${selectedItem.id}`,
        method: "PATCH",
        requestData: updatedData,
      });
    } else cancel();
  };

  return (
    <>
      {isOpen && (
        <div className="blur-bg">
          <div
            className="absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4"
            ref={modalRef}
          >
            <StatusPopup
              success={true}
              body="Shared successfully"
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
              className="text-black text-2xl not-italic font-semibold leading-[normal] border-none rounded-[6px]
                          focus:outline-[#0570EB] focus:bg-[#E6F1FD]"
              value={formData.name}
              onChange={(event) => handleChangeValue?.(event)}
              disabled={formData.name === "XLock"}
            />
            <div className="flex gap-[2px]">
              <p className="text-black text-sm not-italic font-normal leading-[normal]">
                account {selectedItem?.order}
              </p>
              <p className="text-[#767C7C] text-sm not-italic font-normal leading-[normal]">
                {selectedItem && isShareItemType(selectedItem)
                  ? "| Item shared by " + selectedItem?.shared_by.email
                  : null}
              </p>
            </div>
          </div>
        </div>
        <div className=" flex justify-center items-center">
          <button
            className="button-1-empty border-none px-[16px]"
            onClick={cancel}
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
            <InputFieldEdit
              type="credential"
              title="Credentials"
              value={formData.credential}
              handleChangeValue={handleChangeValue}
            />
            <InputFieldEdit
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
            <InputFieldEdit
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

function isShareItemType(item: AccountType): item is ShareItemType {
  return (item as ShareItemType).shared_by !== undefined;
}

export default EditItem;
