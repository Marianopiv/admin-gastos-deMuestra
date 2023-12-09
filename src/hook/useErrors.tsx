import React, { useState } from "react";
import { Errors } from "../interfaces/interfaces";

const useErrors = () => {
  const [errors, setErrors] = useState<any>({});

  const handleBlur = (e: any, text: string) => {
    const { name, value } = e.target;
    if (!value) {
      setErrors({ ...errors, [name]: text });
    } else {
      setErrors((current: any) => {
        // 👇️ create copy of state object
        const copy: Errors = { ...current };

        // 👇️ remove salary key from object
        delete copy[name];

        return copy;
      });
    }
  };
  return { errors, handleBlur };
};

export default useErrors;
