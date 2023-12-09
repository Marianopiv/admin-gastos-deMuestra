import React, { useContext, useState, useEffect } from "react";
import { bancos, mediosDePago, tarjetas } from "../../config/config";
import { GlobalContext } from "../../context/GlobalProvider";
import { IRubros, IPrecios, ITarjetas } from "./interface";
import { Expenses, FullVehicles, RubrosFetched, Target } from "../../interfaces/interfaces";
import { BiCalendar, BiMinus } from "react-icons/bi";
import useFilter from "../../hook/useFilter";
import { agruparPatente, getFullSubRubros, show } from "../../helper";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ButtonTransparent from "../../UI/ButtonTransparent";

type Props = {
  option: string;
  expenses: Expenses[] | string;
  fullVehicles: FullVehicles[];
  help?: string;
  editForm?: Expenses | undefined;
  addExpense?: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | { target: Target },
  ) => void;
  filterExpenseByCar: ((selected: string) => void) | any;
  filterExpenseByDate: (date1: Date, date2: Date, subFiltro: boolean) => void;
  handleEditForm?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
};

const FilterComponent = ({
  option,
  editForm,
  help,
  fullVehicles,
  addExpense,
  handleEditForm,
  filterExpenseByCar,
  filterExpenseByDate,
}: Props) => {
  const { navigate } = useContext(GlobalContext);

  useEffect(() => {}, []);

  const decider = () => {
    switch (option) {
      case "rubro":
        return <Rubros option="rubro" filterExpenseByCar={filterExpenseByCar} navigate={navigate} />;
      case "fechas":
        return <Fechas filterExpenseByDate={filterExpenseByDate} filterExpenseByPrice={() => ""} />;
      case "tarjeta de credito":
        return <Tarjeta addExpense={addExpense} editForm={editForm} option={option} handleEditForm={handleEditForm} />;
      case "tarjeta de debito":
        return <Tarjeta addExpense={addExpense} editForm={editForm} option={option} handleEditForm={handleEditForm} />;
      case "cheque":
        return <Tarjeta addExpense={addExpense} editForm={editForm} option={option} handleEditForm={handleEditForm} />;
      case "marca":
        return (
          <Vehicles
            option={"marca"}
            filterExpenseByCar={filterExpenseByCar}
            navigate={navigate}
            fullVehicles={fullVehicles}
          />
        );
      case "modelo":
        return (
          <Vehicles
            option={"modelo"}
            filterExpenseByCar={filterExpenseByCar}
            navigate={navigate}
            fullVehicles={fullVehicles}
          />
        );
      case "patente":
        return (
          <Vehicles
            option={"patente"}
            filterExpenseByCar={filterExpenseByCar}
            navigate={navigate}
            fullVehicles={fullVehicles}
          />
        );
      case "subRubro":
        return <Rubros option={"subRubro"} filterExpenseByCar={filterExpenseByCar} navigate={navigate} />;
      case "medioPago":
        return <Rubros option={"medioPago"} filterExpenseByCar={filterExpenseByCar} navigate={navigate} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="">{decider()}</div>
      <p className="italic text-gray-600 pt-2">{help}</p>
    </div>
  );
};

export default FilterComponent;

const Rubros = ({ filterExpenseByCar, option }: IRubros) => {
  const { toogleFilter2, rubros } = useContext(GlobalContext);
  const [chosenCategory, setChosenCategory] = useState<string>("");

  const handleChosenCat = (e: any) => {
    setChosenCategory(e.target.value);
  };
  useEffect(() => {
    if (chosenCategory) {
      filterExpenseByCar(chosenCategory, option, toogleFilter2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenCategory]);

  return (
    <div className="flex flex-col justify-center items-center">
      <select
        onChange={handleChosenCat}
        className={`flex ${
          option === "rubro" ? "justify-center px-10 text-center" : "justify-start w-52"
        } my-6  py-2 border rounded-md border-black`}
      >
        {" "}
        <option value={""}>seleccionar</option>
        {(option === "rubro" ? rubros : option === "medioPago" ? mediosDePago : getFullSubRubros(rubros)).map(
          (item: RubrosFetched | string, index: number) => (
            <option className={`${option === "rubro" ? "" : ""}`} key={index}>
              {typeof item === "object" && "rubro" in item ? (item as RubrosFetched).rubro : item}
            </option>
          ),
        )}
      </select>
    </div>
  );
};
const Vehicles = ({ option, filterExpenseByCar }: IRubros) => {
  const [chosenCategory, setChosenCategory] = useState<string>("");
  const { fullVehicles, toogleFilter2 } = useContext(GlobalContext);

  const handleChosenCat = (e: any) => {
    setChosenCategory(e.target.value);
  };

  useEffect(() => {
    if (chosenCategory) {
      switch (option) {
        case "marca":
          return filterExpenseByCar(chosenCategory, option, toogleFilter2);

        case "modelo":
          return filterExpenseByCar(chosenCategory, option, toogleFilter2);
        case "patente":
          return filterExpenseByCar(agruparPatente(chosenCategory, 0, 1, 2), option, toogleFilter2);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenCategory]);

  return (
    <div className="flex flex-col justify-center items-center">
      <select
        onChange={handleChosenCat}
        className={`flex justify-center ${
          option === "patente" ? "text-left" : "text-center"
        }  my-6 px-10 py-2 w-52 border rounded-md border-black`}
      >
        {" "}
        <option value="">seleccionar</option>
        {show(fullVehicles, option)?.map((item, index) => (
          <option
            value={option === "marca" ? item.marca : option === "modelo" ? item.modelo : item.patente}
            key={index}
          >
            {option === "marca"
              ? item.marca
              : option === "modelo"
              ? item.modelo
              : `${item.patente} ${item.marca} ${item.modelo}`}
          </option>
        ))}
      </select>
    </div>
  );
};
const Fechas = ({ filterExpenseByDate }: IPrecios) => {
  const { handleToogleFilter, toogleFilter } = useFilter();
  const { toogleFilter2 } = useContext(GlobalContext);
  const [dateRange, setDateRange] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [selectedRange, setSelectedRange] = useState(false);

  const handleDateSelect = (ranges: any) => {
    setDateRange([ranges.selection]);
    // Verifica si se seleccionaron dos fechas
    if (ranges.selection.startDate && ranges.selection.endDate) {
      setSelectedRange(true);
    } else {
      setSelectedRange(false);
    }
  };

  useEffect(() => {
    // Si ya se seleccionaron dos fechas y no son ambas la fecha inicial predeterminada, ejecuta filterExpenseByDate
    if (selectedRange && dateRange[0].startDate !== dateRange[0].endDate) {
      filterExpenseByDate(dateRange[0].startDate, dateRange[0].endDate, toogleFilter2);
      handleToogleFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRange, dateRange]);

  useEffect(() => {
    handleToogleFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`flex flex-col gap-2 bg-white ${toogleFilter ? "absolute w-32  right-80" : "relative"}`}>
      {toogleFilter && (
        <>
          <DateRangePicker className="" ranges={dateRange} onChange={handleDateSelect} />
          <div className="z-50 bg-white w-32 h-96 absolute"></div>
        </>
      )}
      <ButtonTransparent
        customClass={`text-xs ${toogleFilter ? "border-white left-32 absolute" : ""}  bg-white bottom-4 `}
        text={toogleFilter ? "Oculta" : "Calendario"}
        Icon={toogleFilter ? BiMinus : BiCalendar}
        action={handleToogleFilter}
      />
    </div>
  );
};

const Tarjeta = ({ addExpense, handleEditForm, option, editForm }: ITarjetas) => {
  const { handleToogleFilter, setToogleFilter, toogleFilter } = useFilter();

  useEffect(() => {
    if (editForm?.medioPago === "tarjeta") {
      handleToogleFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (option === "tarjeta de credito" || option === "tarjeta de debito" || option === "cheque") {
      setToogleFilter(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {toogleFilter && (
        <div className="relative flex flex-col justify-center z-50">
          <div
            className={`bg-gray-400 rounded-lg w-56 ${
              option === "tarjeta de credito" || option === "tarjeta de debito" ? "top-8" : "h-8 -top-2"
            } -left-28  absolute`}
          >
            <select
              name={option === "tarjeta de credito" || option === "tarjeta de debito" ? "tarjeta" : "banco"}
              onChange={editForm ? handleEditForm : addExpense}
              defaultValue={
                option === "tarjeta de credito" || option === "tarjeta de debito" ? editForm?.tarjeta : editForm?.banco
              }
              className="absolute text-xs flex justify-center text-center px-14 py-2 border rounded-md border-black"
            >
              {" "}
              <option className="capitalize" value="">
                {option === "tarjeta de credito" || option === "tarjeta de debito"
                  ? "seleccione tarjeta"
                  : "seleccione banco"}
              </option>
              {option === "tarjeta de credito" || option === "tarjeta de debito"
                ? tarjetas.map((item) => <option key={item}>{item}</option>)
                : bancos.map((item) => <option key={item}>{item}</option>)}
            </select>
            {option === "tarjeta de credito" || option === "tarjeta de debito" ? (
              ""
            ) : (
              <div className="flex absolute left-4 top-9 items-center">
                {" "}
                <input
                  onChange={editForm ? handleEditForm : addExpense}
                  placeholder="45614864616486876"
                  name="numero"
                  className="border border-gray-500 rounded-md p-2 text-center"
                  type="number"
                  defaultValue={editForm?.numero}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
