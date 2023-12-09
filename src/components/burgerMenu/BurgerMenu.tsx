import { useContext, useState } from "react";
import { Expenses } from "../../interfaces/interfaces";
import ButtonTransparent from "../../UI/ButtonTransparent";
import { ImFileExcel } from "react-icons/im";
import useExcel from "../../hook/useExcel";
import { GlobalContext } from "../../context/GlobalProvider";
import { sortExpenses } from "../../helper";
import { AiFillCar } from "react-icons/ai";
import { HiMagnifyingGlass } from "react-icons/hi2";
import "animate.css";
import { BiBell } from "react-icons/bi";
import { GrConfigure } from "react-icons/gr";

type Props = {
  toogleFilter: boolean;
  toogleSearch: boolean;
  handleReset: () => void;
  handleToogleFilter: () => void;
  handleToogleSearch: () => void;
  expenses: Expenses[];
};

const BurgerMenu = ({ toogleSearch, expenses, handleToogleSearch }: Props) => {
  const { exportToExcel } = useExcel();
  const { navigate } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative  md:hidden">
      <div
        className={`bg-blue-50 ${isOpen ? "ml-4" : ""} p-3 rounded-md text-white w-40 hover:cursor-pointer`}
        onClick={handleMenuClick}
      >
        <div>{isOpen ? "Menos opciones" : "Mas opciones"}</div>
      </div>
      {isOpen && (
        <div className="mt-4 rounded-md shadow-xl animate__animated animate__fadeIn">
          <ul className="py-2 px-4 flex flex-col gap-4">
            <ButtonTransparent
              customClass={"border-white w-18"}
              action={() => exportToExcel(sortExpenses(expenses))}
              Icon={ImFileExcel}
              text={"Descarga"}
            />
            <ButtonTransparent
              customClass={"border-white w-18"}
              action={() => navigate("/vehicles")}
              Icon={AiFillCar}
              text={"Ver móviles"}
            />
            <ButtonTransparent
              customClass={"border-white w-18"}
              action={handleToogleSearch}
              Icon={HiMagnifyingGlass}
              text={toogleSearch ? "Cerrar" : "Buscar"}
            />
            <ButtonTransparent
              customClass="border-white w-18 text-sm"
              text="Gestion Alertas"
              Icon={BiBell}
              action={() => navigate("/alert-panel")}
            />
            {
              <ButtonTransparent
                customClass="border-white w-18 text-sm"
                text={`Rubro-Sub`}
                Icon={GrConfigure}
                action={() => navigate("/manage-rubros")}
              />
            }
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
