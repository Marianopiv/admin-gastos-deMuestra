declare module 'react-input-mask' {
    import { Component, ChangeEvent } from 'react';
  
    interface InputMaskProps {
      mask: string;
      maskChar?: string;
      formatChars?: { [key: string]: string };
      alwaysShowMask?: boolean;
      beforeMaskedValueChange?: (
        nextState: string,
        currentState: string,
        userInput: string,
        maskOptions: any
      ) => string;
      onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
      onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
      onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
      onMouseEnter?: (event: ChangeEvent<HTMLInputElement>) => void;
      onMouseLeave?: (event: ChangeEvent<HTMLInputElement>) => void;
      onClick?: (event: ChangeEvent<HTMLInputElement>) => void;
      [key: string]: any;
    }
  
    class InputMask extends Component<InputMaskProps> {}
  
    export default InputMask;
  }