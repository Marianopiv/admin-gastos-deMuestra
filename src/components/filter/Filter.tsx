import React, { useContext } from "react";
import FilterComponent from "../FilterComponent/FilterComponent";
import { GlobalContext } from "../../context/GlobalProvider";
import { Expenses, FullVehicles, Target } from "../../interfaces/interfaces";
import { mediosDePago } from "../../config/config";

type Props = {
  expenses: Expenses[] | string;
  filters: string[];
  fullVehicles: FullVehicles[];
  help?: string;
  editForm?: Expenses | undefined;
  option: string[];
  title: string;
  inputRefs: any;
  toogleFilter2?: boolean;
  addExpense: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | { target: Target },
  ) => void;
  filterExpenseByCar?: ((selected: string) => void) | any;
  filterExpenseByDate: (date1: Date, date2: Date,subFiltro:boolean) => void;
  handleEditForm: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  resetExpenses: () => void;
  handleKeyPress: (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLSelectElement>,
    number: number,
  ) => void;
};
const Filter = ({
  filters,
  expenses,
  help,
  title,
  editForm,
  fullVehicles,
  inputRefs,
  toogleFilter2,
  addExpense,
  handleEditForm,
  handleKeyPress,
  filterExpenseByCar,
  filterExpenseByDate,
  resetExpenses,
}: Props) => {
  const { filterOption, handleSetFilter } = useContext(GlobalContext);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (editForm && true) {
      handleEditForm(e);
    } else {
      addExpense(e);
    }
    if (!e.target.value) {
      resetExpenses();
    }
    handleSetFilter(e);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-start">
        <span className="text-left">{title}</span>
      </div>
      <div className="flex flex-col justify-center items-center rounded-md w-full text-center sm:w-auto">
        <select
          ref={
            filters === mediosDePago
              ? (ref) => (inputRefs.current[8] = ref)
              : null
          }
          onKeyPress={(event) => handleKeyPress(event, 8)}
          defaultValue={editForm?.medioPago}
          onChange={handleChange}
          className="capitalize my-4 w-52 py-2 border rounded-md border-black text-center"
          placeholder="elegir gasto"
          name="medioPago"
          id=""
        >
          <option value="">Seleccionar</option>
          {filters.map((item, index) => (
            <option
              value={item}
              key={index}
              className="capitalize px-4  mx-auto"
            >
              {item}
            </option>
          ))}
        </select>
        <FilterComponent
          addExpense={addExpense}
          editForm={editForm}
          handleEditForm={handleEditForm}
          filterExpenseByCar={filterExpenseByCar}
          filterExpenseByDate={filterExpenseByDate}
          expenses={expenses}
          fullVehicles={fullVehicles}
          option={filterOption}
          help={help}
        />
      </div>
    </div>
  );
};

export default Filter;
