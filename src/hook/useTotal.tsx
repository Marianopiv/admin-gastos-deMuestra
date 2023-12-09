import { Expenses } from "../interfaces/interfaces";

const useTotal = () => {
  const getTotal = (arr: Expenses[]) =>
    arr.reduce((acc, { precio }) => acc + Number(precio), 0);

  return { getTotal };
};

export default useTotal;
