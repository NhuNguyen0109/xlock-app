import { useState, useLayoutEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import AccountType from "../../../../types/item";
import "../../../../assets/styles";
import apiCall from "../../../../utils/apiCall";
import ShareItemType, {
  ResponseCreateShareItem,
  ResponseShareItemType,
  CreateShareItem,
} from "../../../../types/share-item";
import StatusPopup from "../../../status-popup/StatusPopup";
import getDecryptedCreds from "../../../../utils/decrypt-creds";
import requestEncrypt from "../../../../utils/browserCall/request.encrypt.key";
import asyncWithErrorHandler from "../../../../utils/errorHandler";

interface SharePopup {
  closeModal(): void;
  item: AccountType | null;
}

const SharePopup: React.FC<SharePopup> = ({ closeModal, item }) => {
  const [tags, setTags] = useState<string[]>([]); //multiple sharing
  const [inputValue, setInputValue] = useState<string>("");

  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: apiCall<ResponseCreateShareItem, CreateShareItem>,
  });

  const { mutate } = useMutation({
    mutationFn: apiCall<ResponseShareItemType, ShareItemType>,
    onSuccess: async (data) => {
      // Get public key of B
      const publicKeyB = data.data.recipient_pub;

      // Decrypt credentials of A to get raw credentials
      const decryptedCreds = await asyncWithErrorHandler(
        () => getDecryptedCreds(data.data.enc_credentials, data.data.type),
        "Failed to decrypt credentials"
      );

      if (!decryptedCreds) return;

      const { raw_creds } = decryptedCreds;

      // Encrypt raw credentials by B's public key
      const enc_credentials = await asyncWithErrorHandler(async () => {
        const response = await requestEncrypt(raw_creds, publicKeyB);
        return response.encrypted;
      }, "Failed to encrypt credentials");

      if (!enc_credentials) return;

      // Create share item
      mutateCreate({
        method: "POST",
        endpoint: "/api/v1/items/share/create",
        requestData: {
          item_id: item?.id || "",
          recipient: {
            email: tags[0],
          },
          enc_credentials,
        },
      });
    },
    onError: (error) => {
      console.error("Shared Failed", error);
    },
  });

  const handleShare = () => {
    mutate({
      method: "POST",
      endpoint: "/api/v1/items/share",
      requestData: {
        item_id: item?.id || "",
        recipient: {
          email: tags[0],
        },
      },
    });
  };

  useLayoutEffect(() => {
    if (isSuccess || isError) {
      const timer = setTimeout(() => {
        closeModal();
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, isError, closeModal]);

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    if (inputValue.trim().length > 0) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTag();
    }
  };

  const handleInputBlur = () => {
    handleAddTag();
  };

  return (
    <div className="w-[432px] h-fit rounded-[12px] bg-yellow z-[5] box-shadow overflow-hidden ">
      {isSuccess && <StatusPopup success={true} body="Shared successfully" />}
      {isError && <StatusPopup success={false} body="Fail to share item" />}
      {!isSuccess && !isError && (
        <>
          <div className="header h-[48px] w-full bg-[#E6F1FD] flex items-center px-[20px] justify-between">
            <p className="title">Your Devices and Browsers</p>
            <div
              className="w-[24px] h-[24px] flex justify-center items-center"
              onClick={closeModal}
            >
              <img src="src/assets/images/Close.png" alt="Close" className="" />
            </div>
          </div>
          <div className="content p-[20px] flex flex-col gap-[28px]">
            <div className="item flex h-fit w-full bg-white items-center gap-[12px] box-shadow p-[12px] rounded-[6px]">
              <div className="w-[32px] h-[32px] flex justify-center">
                <img
                  src={`${
                    item?.logo_url
                      ? item?.logo_url
                      : "src/assets/images/DefaultLogo.png"
                  }`}
                  alt="DefaultLogo"
                  className=""
                />
              </div>
              <div className="flex flex-col">
                <p className="body-text-bold">{item?.name}</p>
                <p className="body-text">account {item?.order}</p>
              </div>
            </div>
            <div className="flex flex-col w-full h-fit">
              <p className="body-text-bold text-[14px] px-[12px] pb-[6px]">
                Invite people
              </p>
              <div id="emailInputContainer" className="w-full">
                <input
                  className="border-solid border-[2px] border-[#D1D3D3] w-full h-[40px] bg-white px-[12px] rounded-[6px] body-text"
                  // autoFocus
                  placeholder="Email address or Username"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onBlur={handleInputBlur}
                  onKeyDown={handleInputKeyDown}
                />
                <div
                  className={`w-full flex flex-wrap gap-x-[4px] gap-y-[4px] ${
                    tags.length === 0 ? null : "mt-[12px]"
                  }`}
                >
                  {tags.map((tag, index) => (
                    <span
                      className="flex w-fit h-fit items-center gap-[8px] py-[4px] px-[8px] bg-[#E6F1FD] rounded-[4px] body-text text-[#29428D]"
                      key={index}
                    >
                      {tag}
                      <div
                        className="w-[14px] h-[14px] flex justify-center items-center "
                        onClick={() => handleRemoveTag(index)}
                      >
                        <img
                          src="src/assets/images/CloseBlue.png"
                          alt="Close"
                        />
                      </div>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              className="button-2-fill w-full h-[40px]"
              onClick={handleShare}
            >
              Share
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SharePopup;
