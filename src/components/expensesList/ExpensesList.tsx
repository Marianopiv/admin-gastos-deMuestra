import { memo, useContext, useMemo, useEffect } from "react";
import { sliceExpenses, sortExpenses } from "../../helper";
import { Expenses } from "../../interfaces/interfaces";
import ColumnItem from "../../UI/ColumnItem";
import { FiEdit } from "react-icons/fi";
import { ImBin2 } from "react-icons/im";
import MobileItem from "../mobileItem/MobileItem";
import { GlobalContext } from "../../context/GlobalProvider";
import useTotal from "../../hook/useTotal";
import { AiOutlineFileExcel, AiOutlineFileSearch } from "react-icons/ai";
import Spinner from "../spinner/Spinner";
import SelectPages from "../selectPages/SelectPages";

type Props = {
  expenses: Expenses[];
  toogleLoader: boolean;
  removeExpense: (
    coleccion: string,
    element: string,
    expense: Expenses,
  ) => void;
  handleToogleLoader:()=>void;
  handleWillDelete: (id: string) => void;
  willDelete: null | string;
};

const ExpensesList = memo(
  ({
    expenses,
    toogleLoader,
    willDelete,
    removeExpense,
    handleWillDelete,
  }: Props) => {
    const { sorted, navigate, sortFullExpenses,ITEMS_PER_PAGE,
      page,
      currentTotalPages,
      handleSET_ITEM_PER_PAGE,
      handleSetCurrentTotalPages,
      handlePageChange, } = useContext(GlobalContext);
    const { getTotal } = useTotal();
    const memoizedExpenses = useMemo(() => expenses, [expenses]);
    useEffect(() => {}, [currentTotalPages]);

    useEffect(() => {
      handleSetCurrentTotalPages(sortExpenses(memoizedExpenses));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [memoizedExpenses, ITEMS_PER_PAGE]);

    if (!toogleLoader&&memoizedExpenses.length<1) {
      return <Spinner />;
    }
    return (
      <>
        {!toogleLoader && memoizedExpenses.length > 0 ? (
          sliceExpenses(
            sortFullExpenses(memoizedExpenses, sorted),
            ITEMS_PER_PAGE,
            page,
          ).map((item: Expenses) => (
            <div className="" key={item.id}>
              <div
                className={`${
                  willDelete === item.id
                    ? "text-red-500 border-2 border-red-500"
                    : "text-black"
                }`}
                key={item.id}
              >
                <div
                  key={item.id}
                  className="hidden sm:flex items-center sm:justify-between sm:border rounded-md px-4 py-2 bg-white"
                >
                  <ColumnItem key={item.id} item={item} />
                  <div className="flex gap-4">
                    <FiEdit
                      onClick={() =>
                        navigate("/addExpense", {
                          state: { action: "edit", item },
                        })
                      }
                      className="hover:cursor-pointer text-lg"
                    />
                    <ImBin2
                      className="hover:cursor-pointer text-lg"
                      onClick={() => {
                        handleWillDelete(item.id);
                        removeExpense("gastos", item.id, item);
                      }}
                    />
                    {item.file ? (
                      <a
                        className="hover:cursor-pointer"
                        href={item.file}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <AiOutlineFileSearch className="text-green-500 text-lg" />
                      </a>
                    ) : (
                      <AiOutlineFileExcel className="text-red-500 text-lg" />
                    )}
                  </div>{" "}
                </div>
                <div className="flex bg-white rounded-md justify-center p-2 w-72 sm:hidden">
                  <MobileItem
                    willDelete={willDelete}
                    handleWillDelete={handleWillDelete}
                    item={item}
                  />
                  <div className="flex gap-4">
                    <FiEdit
                      onClick={() =>
                        navigate("/addExpense", {
                          state: { action: "edit", item },
                        })
                      }
                      className="hover:cursor-pointer"
                    />
                    <ImBin2
                      className="hover:cursor-pointer"
                      onClick={() => {
                        handleWillDelete(item.id);
                        removeExpense("gastos", item.id, item);
                      }}
                    />
                    {item.file ? (
                      <a
                        className="hover:cursor-pointer"
                        href={item.file}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <AiOutlineFileSearch className="text-green-500 text-lg" />
                      </a>
                    ) : (
                      <AiOutlineFileExcel className="text-red-500 text-lg" />
                    )}
                  </div>{" "}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="bg-white font-bold py-4">
            No se encontraron gastos, intente con distintos criterios
          </p>
        )}
        <>
          <div className="flex items-center justify-center sm:justify-end gap-4 flex-wrap">
            <p className="bg-white p-2 rounded-md w-64">
              Total de elementos: {expenses.length}
            </p>
            <p className=" bg-white p-2 rounded-md w-64">
              Gastos totales: <b>$ {getTotal(expenses)}</b>
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 flex-wrap mx-2">
            <div className="flex justify-center items-center gap-2 mx-2 flex-wrap">
              <>
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
              </>
            </div>
            <div className="flex gap-2 items-center">
              <p>Elementos por pagina</p>
              <SelectPages handleSET_ITEM_PER_PAGE={handleSET_ITEM_PER_PAGE} />
            </div>
          </div>
        </>
      </>
    );
  },
);

export default ExpensesList;
