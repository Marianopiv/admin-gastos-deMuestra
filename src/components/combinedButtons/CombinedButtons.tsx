import { useContext } from "react";
import { Expenses } from "../../interfaces/interfaces";
import Button from "../../UI/Button";
import ButtonTransparent from "../../UI/ButtonTransparent";
import { sortExpenses } from "../../helper";
import { ImFileExcel } from "react-icons/im";
import useExcel from "../../hook/useExcel";
import { GlobalContext } from "../../context/GlobalProvider";
import { AiFillCar } from "react-icons/ai";
import { HiMagnifyingGlass } from "react-icons/hi2";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import { BiBell } from "react-icons/bi";
import { GrConfigure } from "react-icons/gr";

type Props = {
  toogleFilter: boolean;
  toogleSearch: boolean;
  handleReset: () => void;
  handleToogleFilter: () => void;
  handleToogleSearch: () => void;
  expenses: Expenses[];
  filteredExpenses: Expenses[];
};

const CombinedButtons = ({
  toogleFilter,
  expenses,
  filteredExpenses,
  toogleSearch,
  handleToogleFilter,
  handleReset,
  handleToogleSearch,
}: Props) => {
  const { exportToExcel } = useExcel();
  const { navigate } = useContext(GlobalContext);
  return (
    <>
      {" "}
      <Button
        action={() =>
          navigate("/addExpense", {
            state: {
              action: "add",
              item: null,
            },
          })
        }
        text="Agregar gasto"
      />
      <BurgerMenu
        handleToogleSearch={handleToogleSearch}
        handleToogleFilter={handleToogleFilter}
        handleReset={handleReset}
        expenses={expenses}
        toogleSearch={toogleSearch}
        toogleFilter={toogleFilter}
      />
      <div className="hidden md:flex gap-4">
        <ButtonTransparent
          action={() => exportToExcel(sortExpenses(filteredExpenses))}
          Icon={ImFileExcel}
          text={"Descarga"}
        />
        <ButtonTransparent action={() => navigate("/vehicles")} Icon={AiFillCar} text={"Ver móviles"} />
        <ButtonTransparent
          action={handleToogleSearch}
          Icon={HiMagnifyingGlass}
          text={toogleSearch ? "Cerrar" : "Buscar"}
        />
        <ButtonTransparent
          customClass="text-xs h-12"
          text="Gestionar Alertas"
          Icon={BiBell}
          action={() => navigate("/alert-panel")}
        />
      </div>
    </>
  );
};

export default CombinedButtons;
