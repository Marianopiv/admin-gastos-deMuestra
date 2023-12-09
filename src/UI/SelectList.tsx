import React from "react";
import { Expenses, Target } from "../interfaces/interfaces";

type Props = {
  listado: (string|number)[] | undefined;
  editForm?:Expenses;
  customClass?: string;
  addExpense?: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | { target: Target },
  ) => void;
  keyDown: (event: any) => void;
  observaciones: (ref: any) => void;
  handleEditForm?:(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void,
  handleAlert?:(e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => void,
  onAlerts:boolean,
};

const SelectList = ({
  customClass,
  editForm,
  listado,
  onAlerts,
  addExpense,
  keyDown,
  handleEditForm,
  handleAlert,
  observaciones,
}: Props) => {
  if (!listado) return <></>;
  return (
    <select
      name={`${onAlerts?"nombreAlerta":"subRubro"}`}
      onChange={onAlerts?handleAlert:editForm ? handleEditForm : addExpense}
      onKeyDown={keyDown}
      ref={observaciones}
      className={`border right-0 z-50 top-24 w-52 p-2 bg-white ${onAlerts?"":"md:absolute"} font-bold text-center border-gray-500 rounded-md`}
    >
      <option value="">{editForm ? editForm.subRubro : "seleccionar subRubro"}</option>
      {listado?.map((item,index) => (
        <option key={index} className="list-none text-left">{item}</option>
      ))}
    </select>
  );
};

export default SelectList;
