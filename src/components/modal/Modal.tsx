import React, { useContext } from "react";
import ButtonTransparent from "../../UI/ButtonTransparent";
import { BiLogOut } from "react-icons/bi";
import { GlobalContext } from "../../context/GlobalProvider";

const Modal = () => {
  const { navigate } = useContext(GlobalContext);
  return (
    <div className="absolute z-50 animate__animated animate__fadeIn bg-white rounded-lg shadow-2xl top-12 p-10 md:p-0 right-12 md:right-2">
      <ButtonTransparent
        customClass="text-xs"
        action={() => navigate(-1)}
        text="Cerrar sesion"
        Icon={BiLogOut}
      />
    </div>
  );
};

export default Modal;
