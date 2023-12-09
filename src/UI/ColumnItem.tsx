import { useState, memo, useContext } from "react";
import { Expenses } from "../interfaces/interfaces";
import { GlobalContext } from "../context/GlobalProvider";
import { expenseAuto } from "../config/config";
import { eliminarInicio20 } from "../helper";

type Props = { item: Expenses | object };
const ColumnItem = memo(({ item }: Props) => {
  const [showText, setShowText] = useState(false);
  const { handleSorted, sorted } = useContext(GlobalContext);
  return (
    <>
      {Object.values(item)
        .slice(1, 12)
        .map((value, index) => (
          <p
            onClick={
              item === expenseAuto
                ? () => handleSorted(value)
                : () => console.log(index)
            }
            onMouseEnter={
              index === 9 || index === 5 ? () => setShowText(true) : undefined
            }
            onMouseLeave={
              index === 9 || index === 5 ? () => setShowText(false) : undefined
            }
            key={index}
            className={`w-36 h-auto hover:${
              (value === "KM" ||
                value === "precio" ||
                value === "subRubro" ||
                value === "observaciones") &&
              item === expenseAuto
                ? "cursor-not-allowed"
                : item === expenseAuto
                ? "cursor-pointer"
                : ""
            } text-sm capitalize text-left ${
              value === sorted &&
              value !== "KM" &&
              value !== "precio" &&
              value !== "subRubro" &&
              value !== "observaciones"
                ? "text-blue-500"
                : ""
            }`}
          >
            {index === 7 && value !== "precio"
              ? `${"$" + value}`
              : value === ""
              ? (value = "------")
              : value !== "observaciones" &&
                (index === 9 || index === 5) &&
                !showText &&
                value.length > 10
              ? value?.slice(0, 10) + "..."
              : index === 3 && value !== "fecha"
              ? eliminarInicio20(value)
              : value}
          </p>
        ))}
    </>
  );
});

export default ColumnItem;
