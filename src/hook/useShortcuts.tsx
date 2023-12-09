import React, { RefObject, useRef, useCallback, useState } from "react";

const useShortcuts = () => {
  const [hasFiles, setHasFiles] = useState<boolean | null>(false);

  const ButtonRef: RefObject<HTMLButtonElement> = useRef(null);

  const handleLastInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //Function used to make jump with tab from a field to another.
    if ((e.key === "Tab" || e.key === "Enter") && !e.shiftKey) {
      e.preventDefault();
      ButtonRef?.current?.focus();
    }
  };
  const handleChooseAndJump = (index: number) => {
    const nextInput = inputRefs.current[index + 1];
    // If it exists, focus on it
    if (nextInput) {
      nextInput.focus();
    }
  };

  const inputRefs = useRef<any[]>([]);

  const handleKeyPress = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLSelectElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
    index: number,
    subRubro?: any,
    inputFirstRef?: any,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // Find the next input field
      if (subRubro && inputFirstRef) {
        const nextInput = inputRefs.current[index + 2];
        if (nextInput) {
          nextInput.focus();
        }
      }
      const nextInput = inputRefs.current[index + 1];

      // If it exists, focus on it
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const inputFirstRef = useRef<HTMLSelectElement>(null);

  const handleFocus = useCallback(() => {
    if (inputFirstRef.current) {
      inputFirstRef.current.focus();
    }
  }, []);

  const handleFileInputClick = () => {
    if (inputRefs.current[9]) {
      inputRefs.current[9].click();
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    // Manejar los archivos seleccionados

    setHasFiles(files && files.length > 0);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (hasFiles) {
      handleLastInputKeyDown(event);
    } else {
      handleFileInputClick();
    }
  };

  function addDecimalPoint(event: any) {
    // Get the current value of the input field.
    var value = event.target.value;

    // Check if the value already contains a decimal point.
    if (value.indexOf(".") !== -1) {
      // The value already contains a decimal point, so do nothing.
      return;
    }

    // The value does not contain a decimal point, so add one every three digits.
    var index = value.length % 3;
    if (index === 0) {
      value += ".";
    }

    // Add the decimal point to the input field as a placeholder.
    event.target.placeholder = value;
  }

  return {
    ButtonRef,
    inputRefs,
    inputFirstRef,
    hasFiles,
    addDecimalPoint,
    handleFileInputClick,
    handleFileInputChange,
    handleKeyDown,
    setHasFiles,
    handleFocus,
    handleChooseAndJump,
    handleLastInputKeyDown,
    handleKeyPress,
  };
};

export default useShortcuts;
