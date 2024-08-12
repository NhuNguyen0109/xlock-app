import { useState, useEffect, useRef } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      (modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)) ||
      (!buttonRef.current &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node))
    ) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return { isOpen, openModal, closeModal, modalRef, buttonRef };
};

export default useModal;
