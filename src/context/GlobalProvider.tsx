import React, { createContext, useState, useEffect } from "react";
import { ContextProps, Expenses, FullVehicles, Rubros } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import useFilter from "../hook/useFilter";
import useAuth from "../hook/useAuth";
import { sortByAlphabethRubro, sortExpenses } from "../helper";
import useVehicles from "../hook/useVehicles";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import usePagination from "../hook/usePagination";
import { GlobalContextConfigDeclarations } from "./GlobalProvider.config";

export const GlobalContext = createContext<ContextProps>(GlobalContextConfigDeclarations);

const GlobalProvider = ({ children }: any) => {
  const { fullVehicles, saveVehicle, handleInput, removeVehicle, handlefullVehicles } = useVehicles();
  const {
    handleSetFilter,
    handleToogleFilter2,
    toogleFilter2,
    filterOption,
    handlePriceFilter,
    handleResetFilter,
    resetExpenses,
    filterExpenseByDate,
  } = useFilter();
  const { handleAuth, authorization, currentUser } = useAuth();
  const {
    currentTotalPages,
    ITEMS_PER_PAGE,
    page,
    handlePageChange,
    handleSET_ITEM_PER_PAGE,
    handleSetCurrentTotalPages,
  } = usePagination();
  const navigate = useNavigate();
  const [sorted, setSorted] = useState("");
  const [lastUpdateKilometer, setLastUpdateKilometer] = useState(0);
  const [selectedVehicles, setSelectedVehicles] = useState<FullVehicles[] | never[]>([]);
  const [rubros, setRubros] = useState<Rubros[]>([]);

  const handleUpdateKilometer = (e: React.ChangeEvent<HTMLInputElement> | number) => {
    if (typeof e === "number") {
      setLastUpdateKilometer(0);
    } else {
      setLastUpdateKilometer(Number(e.target.value));
    }
  };
  const [newAlert, setnewAlert] = useState<{
    nombreAlerta: string;
    kilometros: string;
  }>({ nombreAlerta: "", kilometros: "" });

  const [updateCars, setUpdateCars] = useState<boolean>(false);

  const handleAlert = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setnewAlert({ ...newAlert, [name]: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, vehicle: FullVehicles) => {
    const { checked } = e.target;
    if (selectedVehicles.length > 0 && !checked) {
      console.log(vehicle);
      setSelectedVehicles(
        selectedVehicles.filter((includedVehicles: FullVehicles) => includedVehicles.patente !== vehicle.patente),
      );
    } else {
      setSelectedVehicles([...selectedVehicles, vehicle]);
    }
  };

  const handleAdd = (vehicle: FullVehicles) => {
    setSelectedVehicles([...selectedVehicles, vehicle]);
  };

  const handleRemove = (vehicle: FullVehicles) => {
    setSelectedVehicles(selectedVehicles.filter((v) => v.id !== vehicle.id));
  };

  const handleSearch = (vehicle: FullVehicles) => {
    return selectedVehicles.some((v) => v.id === vehicle.id);
  };

  const resetAlert = () => {
    setnewAlert({ nombreAlerta: "", kilometros: "" });
    handleUpdateKilometer(0);
  };
  const handleSetSelected = (newAlert: Object) => {
    const result = selectedVehicles.map((vehicle) => {
      let updatedAlertModified: { [key: string]: number } = {};
      if (lastUpdateKilometer) {
        // Realizar la asignación al objeto updatedAlertModified
        updatedAlertModified[Object.keys(newAlert)[0]] =
          Number(Object.values(newAlert)[0]) - (Number(vehicle.kilometraje) - Number(lastUpdateKilometer));
      }
      return {
        ...vehicle,
        alertas: lastUpdateKilometer
          ? { ...vehicle.alertas, ...updatedAlertModified }
          : { ...vehicle.alertas, ...newAlert },
        alertasSeteadas: { ...vehicle.alertasSeteadas, ...newAlert },
      };
    });
    setSelectedVehicles(result);
    setUpdateCars(true);
  };

  const handleSorted = (value: string) => {
    setSorted(value);
  };

  const handleUpdateCars = () => {
    setUpdateCars(false);
  };

  const handleSelectedVehicles = () => {
    setSelectedVehicles([]);
  };

  const sortFullExpenses = (expenses: Expenses[], option: string) => {
    switch (option) {
      case "marca":
        return expenses.sort((a, b) => a.marca.localeCompare(b.marca));
      case "modelo":
        return expenses.sort((a, b) => a.modelo.localeCompare(b.modelo));
      case "patente":
        return expenses.sort((a, b) => a.patente.localeCompare(b.patente));
      case "rubro":
        return expenses.sort((a, b) => a.rubro.localeCompare(b.rubro));
      case "empresa":
        return expenses.sort((a, b) => a.empresa.localeCompare(b.empresa));
      case "medios de pago":
        return expenses.sort((a, b) => a.medioPago.localeCompare(b.medioPago));
      default:
        return sortExpenses(expenses);
    }
  };

  useEffect(() => {
    const collectionRef = collection(db, "vehiculos");

    // Subscribe to collection updates using onSnapshot
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        marca: doc.data().marca,
        modelo: doc.data().modelo,
        tipoDeUnidad: doc.data().tipoDeUnidad,
        año: doc.data().año,
        color: doc.data().color,
        patente: doc.data().patente,
        kilometraje: doc.data().kilometraje,
        alertas: doc.data().alertas,
        ...doc.data(),
      }));
      handlefullVehicles(updatedData);
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const collectionRef = collection(db, "rubros");

    // Subscribe to collection updates using onSnapshot
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        rubro: doc.data().rubro,
        ...doc.data(),
      }));
      setRubros(sortByAlphabethRubro(updatedData));

      console.log(rubros);
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        authorization,
        currentUser,
        currentTotalPages,
        filterOption,
        fullVehicles,
        ITEMS_PER_PAGE,
        lastUpdateKilometer,
        page,
        rubros,
        sorted,
        toogleFilter2,
        selectedVehicles,
        updateCars,
        newAlert,
        resetAlert,
        handleAdd,
        handleAlert,
        handleUpdateCars,
        handleSearch,
        handleSelectedVehicles,
        handleChange,
        handleSetSelected,
        handlePriceFilter,
        handleRemove,
        handleUpdateKilometer,
        saveVehicle,
        handleInput,
        handleAuth,
        handlePageChange,
        handleSET_ITEM_PER_PAGE,
        handleSetCurrentTotalPages,
        navigate,
        handleSetFilter,
        handleResetFilter,
        handleToogleFilter2,
        handleSorted,
        resetExpenses,
        filterExpenseByDate,
        sortFullExpenses,
        removeVehicle,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
