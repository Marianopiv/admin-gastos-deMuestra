import { useState } from "react";

const useOpen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationsClick = () => {
    setIsOpen2(!isOpen2);
  };
  return { isOpen,isOpen2, handleNotificationsClick,handleMenuClick };
};

export default useOpen;
