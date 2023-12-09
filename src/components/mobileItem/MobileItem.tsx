import React, { useState } from "react";
import { Expenses } from "../../interfaces/interfaces";

type Props = {
  item: Expenses;
  willDelete: string | null;
  handleWillDelete: (id: string) => void;
};

const MobileItem = ({ item, willDelete, handleWillDelete }: Props) => {
  const {
    id,
    rubro,
    subRubro,
    fecha,
    kilometraje,
    precio,
    empresa,
    observaciones,
    medioPago,
    marca,
    modelo,
    patente,
  } = item;
  const [showText, setShowText] = useState(false);
  return (
    <div
      key={id}
      className={`flex flex-col flex-wrap text-left text-xs w-screen gap-2 ${
        willDelete === id ? "text-red-500" : "text-black"
      }`}
    >
      <div className="flex">
        <p className="font-bold capitalize">{rubro}</p>
      </div>
      <p className="font-bold capitalize">{subRubro}</p>
      <div className="flex gap-4 capitalize">
        <p className="">{fecha}</p>
        <p className="">{kilometraje}km</p>
        <p className="font-bold">${precio}</p>
      </div>
      <div className="flex gap-4 justify-center">
        <p className="capitalize">{empresa}</p>
        <p>Pago con: {medioPago}</p>
      </div>
      <div className="flex gap-4 justify-center">
        <p>{marca}</p>
        <p>{modelo}</p> <p>{patente}</p>
      </div>

      <p
        onMouseEnter={() => setShowText(true)}
        onMouseLeave={() => setShowText(false)}
        className=""
      >
        {!showText && observaciones.length > 30
          ? observaciones?.slice(0, 30) + "..."
          : observaciones}
      </p>
      <p></p>
    </div>
  );
};

export default MobileItem;
