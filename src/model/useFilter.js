import { useState } from "react";

const useFilter = (data) => {
  const [filteredExpenses, setFilteredExpenses] = useState(data);
  const filterByRubro = (value, subFiltro) => {
    if (!value) {
      setFilteredExpenses(data);
      return;
    }
    setFilteredExpenses(data.filter((item) => item.rubro === value));
    if (subFiltro) {
      setFilteredExpenses(
        filteredExpenses.filter((item) => item.marca === value)
      );
      return;
    }
  };
  return { filterByRubro, filteredExpenses };
};

export default useFilter;