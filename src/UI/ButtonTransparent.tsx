import React from "react";
import { FaSpinner } from "react-icons/fa";
type Props = {
  Icon: Function;
  text: string;
  action: () => void;
  customClass?: string;
};

const ButtonTransparent = ({ Icon, text, customClass, action }: Props) => {
  return (
    <div
      onClick={action}
      className={`border border-black p-3 rounded-md md:w-40 hover:cursor-pointer hover:bg-blue-50 hover:text-white flex gap-9 items-center ${
        customClass ? customClass : ""
      }`}
    >
      <Icon
        className={`hover:cursor-pointer hover:text-white ${
          Icon === FaSpinner ? "animate-spin" : ""
        }`}
      />
      <div
        className={`${
          Number(text.slice(8, 9)) > 0 ? "text-red-500" : ""
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ButtonTransparent;
