import { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { RootState } from "../../../../store";
import "../../../../assets/styles";
import { apiCall, ApiEndpoints } from "../../../../utils";
import {
  ResponseCreateShareItem,
  CreateShareItem,
} from "../../../../types/share-item";
import StatusPopup from "../../../status-popup/StatusPopup";
import getDecryptedCreds from "../../../../utils/decrypt-creds";
import requestEncrypt from "../../../../utils/browserCall/request.encrypt.key";
import asyncWithErrorHandler from "../../../../utils/errorHandler";
import KeyType from "../../../../types/key";

interface SharePopup {
  closeModal(): void;
}

const SharePopup: React.FC<SharePopup> = ({ closeModal }) => {
  const item = useSelector((state: RootState) => state.item.selectedItem);
  const [tags, setTags] = useState<string[]>([]); //multiple sharing
  const [inputValue, setInputValue] = useState<string>("");
  const [errorCallingExt, setErrorCallingExt] = useState(false);

  const { mutate: mutateGetKey } = useMutation({
    mutationFn: apiCall<KeyType>,
    onSuccess: async (data) => {
      // Get public key of B
      const publicKeyB = data.data.public_key;

      // Decrypt credentials of A to get raw credentials
      const decryptedCreds = await asyncWithErrorHandler(
        () => getDecryptedCreds(item.enc_credentials, item.type),
        "Failed to decrypt credentials"
      );

      if (!decryptedCreds) {
        setErrorCallingExt(true);
        return;
      }

      const { raw_creds } = decryptedCreds;

      // Encrypt raw credentials by B's public key
      const enc_credentials = await asyncWithErrorHandler(async () => {
        const response = await requestEncrypt(raw_creds, publicKeyB);
        return response.encrypted;
      }, "Failed to encrypt credentials");

      if (!enc_credentials) {
        setErrorCallingExt(true);
        return;
      }

      // Create share item
      mutateCreate({
        method: "POST",
        endpoint: ApiEndpoints.CreateShareItem,
        requestData: {
          item_id: item.id,
          recipient: tags[0],
          enc_credentials,
        },
      });
    },
    onError: (error) => {
      console.error("Shared Failed", error);
    },
  });

  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: apiCall<ResponseCreateShareItem, CreateShareItem>,
    onSuccess: () => console.log("Successfully created shared item"),
    onError: () => console.log("Failed to created shared item"),
  });

  const handleShare = () => {
    mutateGetKey({
      method: "POST",
      endpoint: `${ApiEndpoints.GetKey}${tags[0]}`,
    });
  };

  useLayoutEffect(() => {
    if (isSuccess || isError || errorCallingExt) {
      const timer = setTimeout(() => {
        closeModal();
        setErrorCallingExt(false);
      }, 700);

      return () => {
        clearTimeout(timer);
        setErrorCallingExt(false);
      };
    }
  }, [isSuccess, isError, errorCallingExt, closeModal]);

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
    <div className="w-[432px] h-fit rounded-[12px] bg-white z-[5] box-shadow overflow-hidden ">
      {isSuccess && <StatusPopup success={true} body="Shared successfully" />}
      {(isError || errorCallingExt) && (
        <StatusPopup success={false} body="Fail to share item" />
      )}
      {!isSuccess && !isError && !errorCallingExt && (
        <>
          <div className="header h-[48px] w-full bg-[#E6F1FD] flex items-center px-[20px] justify-between">
            <p className="title">Share item</p>
            <div
              className="w-[24px] h-[24px] flex justify-center items-center"
              onClick={closeModal}
            >
              <img src="/images/Close.png" alt="Close" className="" />
            </div>
          </div>
          <div className="content p-[20px] flex flex-col gap-[28px]">
            <div className="item flex h-fit w-full bg-white items-center gap-[12px] box-shadow p-[12px] rounded-[6px]">
              <div className="w-[32px] h-[32px] flex justify-center">
                <img
                  src={`${
                    item.logo_url ? item.logo_url : "/images/DefaultLogo.png"
                  }`}
                  alt="DefaultLogo"
                  className=""
                />
              </div>
              <div className="flex flex-col">
                <p className="body-text-bold">{item.name}</p>
                <p className="body-text">account {item?.order}</p>
              </div>
            </div>
            <div className="flex flex-col w-full h-fit">
              <p className="body-text-bold text-[14px] px-[12px] pb-[6px]">
                Invite people
              </p>
              <div id="emailInputContainer" className="w-full">
                <input
                  className="border-solid border-[2px] border-[#D1D3D3] w-full h-[40px] bg-white px-[12px] rounded-[6px] body-text focus:outline-[#0570EB]"
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
                        <img src="/images/CloseBlue.png" alt="Close" />
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
