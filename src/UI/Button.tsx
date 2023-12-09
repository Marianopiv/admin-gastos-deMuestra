import React, { MutableRefObject } from "react";

type Props = {
  action?: () => void;
  text: string;
  ref?: MutableRefObject<null>;
  customClass?: string;
};

const Button = ({ action, text, ref, customClass }: Props) => {
  return (
    <div
      ref={ref}
      className={`bg-blue-50 p-3 rounded-md text-white w-40 hover:cursor-pointer ${customClass ? customClass : ""}`}
      onClick={action}
    >
      <div>{text}</div>
    </div>
  );
};

export default Button;
