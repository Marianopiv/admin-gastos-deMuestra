import { useContext, useEffect, memo } from "react";
import { FiEdit } from "react-icons/fi";
import { ImBin2 } from "react-icons/im";
import { AiOutlineFileExcel } from "react-icons/ai";
import { GlobalContext } from "../../context/GlobalProvider";
import ColumnItem from "../../UI/ColumnItem";
import { expenseAuto, filters } from "../../config/config";
import ExpensesList from "../expensesList/ExpensesList";
import Filter from "../filter/Filter";
import useFilter from "../../hook/useFilter";
import CombinedButtons from "../combinedButtons/CombinedButtons";
import DeletedExpenses from "../deletedExpenses/DeletedExpenses";
import useSaveDelete from "../../hook/useSaveDelete";
import ButtonTransparent from "../../UI/ButtonTransparent";
import useSearch from "../../hook/useSearch";
import { BiBell, BiMinus, BiPlus, BiReset, BiUser } from "react-icons/bi";
import {GrConfigure} from "react-icons/gr"
import useOpen from "../../hook/useOpen";
import Modal from "../modal/Modal";
import { ExpensesContext } from "../../context/ExpensesProvider";
import Notifications from "../notifications/Notifications";

const DinamicInfo = memo(() => {
  const {
    currentUser,
    fullVehicles,
    toogleFilter2,
    handleToogleFilter2,
    handleResetFilter,
    navigate,
  } = useContext(GlobalContext);
  const { handleWillDelete,marcAsViewed, willDelete, expenses,notifications, removeExpense } =
    useContext(ExpensesContext);
  const {
    handleToogleFilter,
    toogleFilter,
    toogleLoader,
    filteredExpenses,
    filterExpenseByCar,
    filterExpenseByDate,
    resetExpenses,
    setToogleLoader
  } = useFilter();
  const { deleted, toogleDeleted, handleToogleDeleted } = useSaveDelete();
  const { search, handleToogleSearch, handleResetSearch, toogleSearch } =
    useSearch();

  const { isOpen, isOpen2,handleMenuClick, handleNotificationsClick } = useOpen();

  const handleReset = () => {
    handleToogleFilter();
    handleResetFilter("");
    resetExpenses();
  };

  const handleAlerts = () => {
    handleNotificationsClick()
    marcAsViewed("notifications")
  }

  const handleToogleLoader = () => {
    setToogleLoader(true)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses]);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        toogleFilter ? "" : "sm:gap-10"
      } mt-2 md:mt-8 sm:mx-10 lg:mx-20`}
    >
      <div className="flex flex-col md:flex-row items-center">
        <div
          onClick={handleMenuClick}
          className="flex hover:cursor-pointer md:hidden my-4 gap-4 items-center"
        >
          <BiUser />
          <p>{currentUser}</p>
          {isOpen && <Modal />}
        </div>
        <div className="flex gap-4 flex-col items-center mt-2 mx-2">
          <div
            className={`flex flex-wrap justify-center md:justify-normal w-screen px-20 gap-10`}
          >
            <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-4 lg:hidden">
              <CombinedButtons
                filteredExpenses={filteredExpenses}
                handleToogleSearch={handleToogleSearch}
                handleToogleFilter={handleToogleFilter}
                handleReset={handleReset}
                expenses={expenses}
                toogleSearch={toogleSearch}
                toogleFilter={toogleFilter}
              />
              <div className="flex sm:hidden">
                <Filter
                  handleKeyPress={() => ""}
                  inputRefs={7}
                  handleEditForm={() => ""}
                  addExpense={() => ""}
                  title={"Tipo de filtro"}
                  help={"*Seleccione el criterio de filtrado"}
                  filters={filters}
                  expenses={filteredExpenses}
                  fullVehicles={fullVehicles}
                  filterExpenseByCar={filterExpenseByCar}
                  filterExpenseByDate={filterExpenseByDate}
                  resetExpenses={resetExpenses}
                  option={[""]}
                />
              </div>
            </div>
            <div
              className={`hidden flex-col sm:flex-row sm:justify-center items-center gap-4 lg:flex lg:text-sm ${
                toogleSearch ? "relative" : ""
              }`}
            >
              <CombinedButtons
                handleToogleSearch={handleToogleSearch}
                handleToogleFilter={handleToogleFilter}
                handleReset={handleReset}
                filteredExpenses={filteredExpenses}
                toogleSearch={toogleSearch}
                expenses={expenses}
                toogleFilter={toogleFilter}
              />
            </div>
            <div className="hidden sm:flex">
              <Filter
                handleKeyPress={() => ""}
                inputRefs={7}
                handleEditForm={() => ""}
                addExpense={() => ""}
                title={"Tipo de filtro"}
                help={"*Seleccione el criterio de filtrado"}
                filters={filters}
                expenses={filteredExpenses}
                fullVehicles={fullVehicles}
                filterExpenseByCar={filterExpenseByCar}
                filterExpenseByDate={filterExpenseByDate}
                resetExpenses={resetExpenses}
                option={[""]}
              />
            </div>
            <ButtonTransparent
              customClass="h-12 my-auto"
              text={`${!toogleFilter2 ? "Filtro extra" : "Cierra"}`}
              Icon={toogleFilter2 ? BiMinus : BiPlus}
              action={handleToogleFilter2}
            />
            {toogleFilter2 && (
              <Filter
                handleKeyPress={() => ""}
                inputRefs={7}
                handleEditForm={() => ""}
                addExpense={() => ""}
                title={"Tipo de filtro"}
                help={"*Seleccione el criterio de filtrado"}
                filters={filters}
                expenses={filteredExpenses}
                fullVehicles={fullVehicles}
                filterExpenseByCar={filterExpenseByCar}
                filterExpenseByDate={filterExpenseByDate}
                resetExpenses={resetExpenses}
                toogleFilter2={toogleFilter2}
                option={[""]}
              />
            )}
             {<ButtonTransparent
              customClass="text-sm my-auto hidden sm:flex"
              text={`Rubro-Sub`}
              Icon={GrConfigure}
              action={() => navigate("/manage-rubros")}
            />}
            
            <div
              onClick={handleNotificationsClick}
              className="hidden hover:cursor-pointer md:absolute md:flex top-8 right-56 items-center"
            >
              <ButtonTransparent
                customClass="text-xs border-0 md:w-20 lg:w-auto"
                Icon={BiBell}
                text={`Notificaciones ${notifications.filter(notification => !notification.viewed).length}`}
                action={handleAlerts}
              />
              {isOpen2 && <Notifications />}
            </div>
            <div
              onClick={handleMenuClick}
              className="hidden hover:cursor-pointer md:absolute md:flex top-8 right-2 items-center"
            >
              <ButtonTransparent
                customClass="text-xs border-0 md:w-auto lg:w-auto"
                text={currentUser}
                Icon={BiUser}
                action={handleMenuClick}
              />
              {isOpen && <Modal />}
            </div>
          </div>
        </div>
      </div>
      {toogleSearch && (
        <>
          <div className="lg:absolute lg:top-40 left-1/3 xl:left-1/4 xl:mr-0  flex items-center  gap-4  mr-10 animate__animated animate__fadeIn ">
            <BiReset
              onClick={handleResetSearch}
              className="text-blue-50 h-10 rounded-md w-10"
            />
            <input
              onChange={(e) => search(e, expenses)}
              placeholder="Buscar general"
              className="border border-gray-500 rounded-md py-2 text-center"
              type="text"
            />
          </div>
        </>
      )}
      <div className="flex flex-col gap-4 items-center sm:items-stretch border-2 bg-gray-400 rounded-md w-screen sm:px-6 py-8 overflow-x-scroll md:overflow-hidden">
        <div className=" capitalize hidden sm:flex items-center sm:justify-between pt-2  px-4 sm:border rounded-md bg-white text-sm font-bold">
          <ColumnItem item={expenseAuto} />
          <div className="flex gap-4 invisible">
            <FiEdit className="hover:cursor-pointer text-lg" />
            <ImBin2 className="hover:cursor-pointer text-lg" />
            <AiOutlineFileExcel className="text-red-500 text-lg" />
          </div>{" "}
        </div>
        {!toogleDeleted ? (
          <ExpensesList
          handleToogleLoader={handleToogleLoader}
            toogleLoader={toogleLoader}
            willDelete={willDelete}
            expenses={filteredExpenses}
            handleWillDelete={handleWillDelete}
            removeExpense={removeExpense}
          />
        ) : (
          <DeletedExpenses deleted={deleted} />
        )}
        <div className="flex justify-end">
          <ButtonTransparent
            action={handleToogleDeleted}
            Icon={ImBin2}
            customClass="text-xs bg-white text-red-500"
            text={` ${toogleDeleted ? "Cerrar" : "Ver eliminados"}`}
          />{" "}
        </div>
      </div>
    </div>
  );
});

export default DinamicInfo;
