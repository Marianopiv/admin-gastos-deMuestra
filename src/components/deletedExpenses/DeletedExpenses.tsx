import { sliceExpenses, sortExpenses } from "../../helper";
import { Expenses } from "../../interfaces/interfaces";
import ColumnItem from "../../UI/ColumnItem";
import MobileItem from "../mobileItem/MobileItem";
import usePagination from "../../hook/usePagination";
import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { ImBin2 } from "react-icons/im";
import { AiOutlineFileExcel } from "react-icons/ai";

type Props = {
  deleted: Expenses[];
};

const DeletedExpenses = ({ deleted }: Props) => {
  const {
    ITEMS_PER_PAGE,
    page,
    currentTotalPages,
    handleSetCurrentTotalPages,
    handlePageChange,
  } = usePagination();

  useEffect(() => {}, [deleted]);

  useEffect(() => {
    handleSetCurrentTotalPages(sortExpenses(deleted));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {deleted.length > 0
        ? sliceExpenses(sortExpenses(deleted), ITEMS_PER_PAGE, page).map(
            (item: Expenses) => (
              <div key={item.id}>
                <div
                  key={item.id}
                  className="hidden sm:flex gap-10  items-center  sm:justify-between sm:border rounded-md text-xs px-2 py-2 bg-white"
                >
                  <ColumnItem key={item.id} item={item} />
                  <div className="flex gap-4">
                    <FiEdit className="invisible" />
                    <ImBin2 className="invisible" />
                    <AiOutlineFileExcel className="invisible" />
                  </div>{" "}
                </div>
                <div className="flex bg-white rounded-md justify-center p-2 w-72 sm:hidden">
                  <MobileItem
                    willDelete={null}
                    handleWillDelete={() => ""}
                    item={item}
                  />
                </div>
              </div>
            ),
          )
        : "No se encontraron gastos de baja"}
      <div className="flex flex-col justify-center items-center gap-2 flex-wrap mx-2 mt-4">
        <div className="flex justify-center items-center gap-2 flex-wrap mx-2">
          {currentTotalPages.map((item, index) => (
            <button
              key={index}
              className={`${
                item === page
                  ? "bg-blue-50 w-8 h-8 rounded-full border-2 text-white"
                  : "border-2 bg-white rounded-full w-8 h-8"
              }`}
              onClick={() => handlePageChange(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeletedExpenses;
