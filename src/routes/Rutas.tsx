import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddVehicle from "../components/addVehicle/AddVehicle";
import DinamicInfo from "../components/dinamicInfo/DinamicInfo";
import Filter from "../components/filter/Filter";
import GlobalProvider, { GlobalContext } from "../context/GlobalProvider";
import Login from "../components/login/Login";
import { useContext, useEffect } from "react";
import PrivateRoute from "./PrivateRoute";
import ExpensesProvider from "../context/ExpensesProvider";
import CarPanel from "../components/vehiclesPanel/VehiclesPanel";
import AddExpenseComponent from "../components/addExpenseComponent/AddExpenseComponent";
import ManageAlerts from "../components/manageAlerts/ManageAlerts";
import ManageRubros from "../components/manageRubros/ManageRubros";

const Rutas = () => {
  const { authorization } = useContext(GlobalContext);

  useEffect(() => {}, [authorization]);
  return (
    <BrowserRouter>
      <GlobalProvider>
        <ExpensesProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/vehicles" element={<PrivateRoute Component={CarPanel} />} />
            <Route
              path="/addVehicle"
              element={<PrivateRoute Component={AddVehicle} />}
            />
            <Route
              path="/addExpense"
              element={<PrivateRoute Component={AddExpenseComponent} />}
            />
            <Route
              path="/"
              element={<PrivateRoute Component={DinamicInfo} />}
            />
            <Route
              path="/filter"
              element={<PrivateRoute Component={Filter} />}
            />
            <Route
              path="/alert-panel"
              element={<PrivateRoute Component={ManageAlerts} />}
            />
            <Route
              path="/manage-rubros"
              element={<PrivateRoute Component={ManageRubros} />}
            />
          </Routes>
        </ExpensesProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
};

export default Rutas;
