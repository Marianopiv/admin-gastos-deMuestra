import React, { useState,useContext } from "react";
import { Expenses } from "../interfaces/interfaces";
import { ExpensesContext } from "../context/ExpensesProvider";

const useSearch = () => {
  const [toogleSearch, setToogleSearch] = useState<boolean>(false);
  const {expenses,handleFilteredExpenses} = useContext(ExpensesContext)

  const search = (
    e: React.ChangeEvent<HTMLInputElement>,
    expenses: Expenses[],
  ) => {
    const { value } = e.target;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    
    handleFilteredExpenses(
      expenses.filter(
        (item) =>
          item.empresa.toLowerCase().includes(value) ||
          item.fecha.toLowerCase().includes(value) ||
          item.marca.toLowerCase().includes(value) ||
          item.modelo.toLowerCase().includes(value) ||
          item.patente.toLowerCase().includes(value) ||
          item.rubro.toLowerCase().includes(value) ||
          item.kilometraje.toString().toLowerCase().includes(value) ||
          item.precio.toString().toLowerCase().includes(value) ||
          item.medioPago.toLowerCase().includes(value)||item.observaciones.toLowerCase().includes(value)
      ),
    );
  };

  const handleResetSearch = () => {
    handleFilteredExpenses(expenses);
  };

  const handleToogleSearch = () => {
    setToogleSearch(!toogleSearch);
    if (toogleSearch) {
      handleFilteredExpenses(expenses)
    }
  };

  return {
    toogleSearch,
    handleToogleSearch,
    handleResetSearch,
    search,
  };
};

export default useSearch;
