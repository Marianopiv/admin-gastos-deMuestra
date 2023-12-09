import { ExpensesContext } from "../../context/ExpensesProvider";
import { useContext } from "react";
import { sortExpenses } from "../../helper";

const Notifications = () => {
  const { notifications } = useContext(ExpensesContext);
  return (
    <div className="absolute top-24 animate__animated animate__fadeIn  shadow-2xl border border-black p-3 rounded-md bg-white overflow-y-scroll h-96">
      {notifications.length > 0 &&
        sortExpenses(notifications).map(({ alert, patente },index) => (
          <div
            key={index}
            className="text-left flex w-72 text-sm flex-col border border-black rounded-md mb-2 p-2"
          >
            <p className="font-bold text-red-500">Vencido para el movil {patente}</p>
            {Object.entries(alert).map((item: any,index) => (
              <li key={index} className="">
                {item[0]} {item[1]} km
              </li>
            ))}{" "}
          </div>
        ))}
    </div>
  );
};

export default Notifications;
