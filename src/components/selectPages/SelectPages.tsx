import React from "react";
import { pageNumbers } from "../../config/config";

type Props = {
  handleSET_ITEM_PER_PAGE: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectPages = ({ handleSET_ITEM_PER_PAGE }: Props) => {
  return (
    <select
      name=""
      onChange={handleSET_ITEM_PER_PAGE}
      className="p-2 w-14 bg-white font-bold text-center border-gray-500 rounded-md"
    >
      <option value={10}>10</option>
      {pageNumbers?.map((item,index) => (
        <option key={index} className="list-none text-left">{item}</option>
      ))}
    </select>
  );
};

export default SelectPages;
