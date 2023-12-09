import React, { useState, useContext, useEffect } from "react";
import { Prices } from "../interfaces/interfaces";
import { ExpensesContext } from "../context/ExpensesProvider";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const useFilter = () => {
  const [filterOption, setFilterOption] = useState<string>("");
  const [priceFilter, setpriceFilter] = useState<Prices>({
    desde: "",
    hasta: "",
  });
  const [toogleFilter, setToogleFilter] = useState<boolean>(false);
  const [toogleFilter2, setToogleFilter2] = useState<boolean>(false);
  const [toogleLoader, setToogleLoader] = useState<boolean>(false);
  const { expenses, filteredExpenses, handleFilteredExpenses } =
    useContext(ExpensesContext);

  const navigate = useNavigate();

  const handleSetFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilterOption(value);
  };

  const handleResetFilter = (value: string) => {
    setFilterOption(value);
  };

  const handlePriceFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setpriceFilter({ ...priceFilter, [name]: value });
  };

  const handleToogleFilter = () => {
    setToogleFilter(!toogleFilter);
  };
  const handleToogleFilter2 = () => {
    setToogleFilter2(!toogleFilter2);
  };

  const filterExpenseByCar = (
    selected: string,
    option: string,
    subFiltro: boolean,
  ) => {
      handleFilteredExpenses(
        (!subFiltro?expenses:filteredExpenses).filter(
          (item) =>
            (option === "marca"
              ? item.marca
              : option === "modelo"
              ? item.modelo
              : option === "patente"
              ? item.patente
              : option === "rubro"
              ? item.rubro
              : option === "subRubro"
              ? item.subRubro
              : item.medioPago) === selected,
        ),
      );
  };

  const filterExpenseByDate = (
    date1: Date,
    date2: Date,
    subFiltro: boolean,
  ) => {
      const resultado = (!subFiltro?expenses:filteredExpenses).filter(({ fecha }) => {
        const momentDate = moment(fecha, "DD-MM-YYYY");
        return momentDate.isBetween(date1, date2, null, "[]");
      });
      handleFilteredExpenses(resultado);
  };

  const resetExpenses = () => {
    handleFilteredExpenses(expenses);
  };

  useEffect(() => {}, [filteredExpenses]);

  return {
    handleSetFilter,
    handleToogleFilter,
    handleToogleFilter2,
    handleResetFilter,
    handlePriceFilter,
    setToogleFilter,
    filterExpenseByDate,
    filterExpenseByCar,
    navigate,
    setToogleLoader,
    resetExpenses,
    filterOption,
    priceFilter,
    toogleFilter,
    toogleFilter2,
    toogleLoader,
    filteredExpenses,
  };
};

export default useFilter;
