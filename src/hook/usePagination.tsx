import { useState } from "react";
import { Expenses } from "../interfaces/interfaces";

const usePagination = () => {
  const [page, setPage] = useState<number>(1);
  const [ITEMS_PER_PAGE, setITEMS_PER_PAGE] = useState(10);
  const [currentTotalPages, setCurrentTotalPages] = useState<number[]>([]);
  // Number of items to display per page

  const returnPaginationNumber = (data: Expenses[]) => {
    return data.reduce((acc: number[], item, index) => {
      if (index % ITEMS_PER_PAGE === 0) {
        acc.push(acc.length + 1);
      }
      return acc;
    }, []);
  };
  const handleSetCurrentTotalPages = (arr: Expenses[]) => {
    const resultado = returnPaginationNumber(arr);
    setCurrentTotalPages(resultado);
  };
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleSET_ITEM_PER_PAGE = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setITEMS_PER_PAGE(Number(value));
  };

  return {
    currentTotalPages,
    ITEMS_PER_PAGE,
    page,
    handlePageChange,
    handleSET_ITEM_PER_PAGE,
    handleSetCurrentTotalPages,
  };
};

export default usePagination;
