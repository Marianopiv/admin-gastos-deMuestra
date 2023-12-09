import React, { createContext, useState, useContext, useEffect } from "react";
import { Expenses, ExpensesContextProps, ExpenseSaved, Target } from "../interfaces/interfaces";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, storage } from "../Firebase";
import { GlobalContext } from "./GlobalProvider";
import useSaveDelete from "../hook/useSaveDelete";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UpdateAlerts, rightNow } from "../helper";
import moment from "moment";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { expenseModel } from "../config/config";
import { Toast, ToastConfirm, ToastRed } from "../UI/CustomAlert";
import useNotification from "../hook/useNotification";

export const ExpensesContext = createContext<ExpensesContextProps>({
  addExpense: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | { target: Target },
  ) => "",
  handleAddFiles: (e: React.ChangeEvent<HTMLInputElement>) => {},
  handleFilteredExpenses: (expenses: Expenses[]) => {},
  saveExpense: (title: string, info: any) => {},
  removeExpense: (coleccion: string, id: string, expense: Expenses) => {},
  handleWillDelete: (e: string) => {},
  updateExpense: (id: string, title: string, info: any) => {},
  marcAsViewed: (coleccion: string) => {},
  expenses: [],
  filteredExpenses: [],
  expense: expenseModel,
  notifications: [],
  toogleLoader: false,
  willDelete: "",
});
const ExpensesProvider = ({ children }: any) => {
  const { Provider } = ExpensesContext;
  const { saveDeleted } = useSaveDelete();
  const { currentUser } = useContext(GlobalContext);
  const { saveNotification, marcAsViewed, notifications } = useNotification();
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [expense, setExpense] = useState<ExpenseSaved>(expenseModel);
  const resetExpense = () => {
    setExpense(expenseModel);
  };
  const [toogleLoader, setToogleLoader] = useState<boolean>(false);
  const [filteredExpenses, setFilteredExpenses] = useState<Expenses[]>(expenses);
  const [willDelete, setWillDelete] = useState<null | string>(null);

  const handleWillDelete = (e: string) => {
    setWillDelete(e);
  };
  const handleFilteredExpenses = (expenses: Expenses[]) => {
    setFilteredExpenses(expenses);
  };

  const navigate = useNavigate();

  const removeExpense = async (coleccion: string, id: string, expense: Expenses) => {
    try {
      Swal.fire({
        title: "Seguro queres eliminar este elemento?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        denyButtonText: `salir sin guardar`,
      }).then(async (result) => {
        setWillDelete(null);
        if (result.isConfirmed) {
          await deleteDoc(doc(db, coleccion, id));
          await Toast.fire({
            icon: "success",
            title: "Gasto Eliminado correctamente",
          });
          await saveDeleted("baja", expense);
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error: any) {
      Swal.fire({
        title: "Ups!",
        text: error,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };
  const addExpense = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | { target: Target },
  ) => {
    const { name, value } = e.target;
    if (name === "auto" && value) {
      const selectedValue = JSON.parse(value);
      setExpense({
        ...expense,
        marca: selectedValue.marca,
        modelo: selectedValue.modelo,
        patente: selectedValue.patente.replace(/ /g, ""),
        idVehiculo: selectedValue.id,
      });
    } else if (name === "fecha") {
      setExpense({
        ...expense,
        [name]: moment(value).format("DD/MM/YYYY"),
      });
    } else {
      setExpense({ ...expense, [name]: value });
    }
  };
  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setExpense({ ...expense, file });
  };
  const saveExpense = async (title: string, info: any) => {
    setToogleLoader(true);
    if (!expense.fecha) {
      expense.fecha = rightNow;
    }
    const rightNowHora = moment().format("HH:mm:ss");
    if (!expense.hora) {
      expense.hora = rightNowHora;
    }
    if (!expense.medioPago) {
      const efectivo = "efectivo";
      expense.medioPago = efectivo;
    }
    try {
      if (info.file) {
        const imageRef = ref(storage, `images/${info.file?.name}`);
        const [, getUrl] = await Promise.all([await uploadBytes(imageRef, info.file), await getDownloadURL(imageRef)]);
        info.file = getUrl;
      }
      let messageToMail = {
        to: `marianopividori93@gmail.com`,
        gasto: info.rubro,
        subRubro: info.subRubro,
        observaciones: info.observaciones,
        marca: info.marca,
        modelo: info.modelo,
        patente: info.patente,
        precio: info.precio,
        adjunto: info.file,
        fecha: info.fecha,
        text: `Se agregó un gasto de ${info.rubro} ${info.subRubro && info.subRubro} con el detalle ${
          info.observaciones
        } en el vehiculo ${info.marca} ${info.modelo} ${info.patente} con un total de ${info.precio}`,
      };
      const collectionRef = collection(db, `gastos`);
      let temp: any = { kilometraje: expense.kilometraje };
      if (expense.kilometraje) {
        temp.kilometraje = expense.kilometraje;
      }
      const docRef = doc(db, `vehiculos/${expense.idVehiculo}`);

      const docSnap = await getDoc(docRef); // Obtener los datos del vehículo

      const vehicleData = docSnap.data(); // Datos del vehículo
      if (expense.kilometraje !== 0 && Number(expense.kilometraje) < Number(vehicleData?.kilometraje)) {
        await ToastRed.fire({
          icon: "warning",
          title: `Estas queriendo cargar un kilometraje menor al ultimo registrado (${vehicleData?.kilometraje} km)`,
        });
        setToogleLoader(false);
        return;
      }
      if (expense.kilometraje !== 0 && vehicleData?.kilometraje) {
        const diferenciaKilometraje = Number(expense.kilometraje) - Number(vehicleData?.kilometraje);
        if (diferenciaKilometraje >= 1000) {
          const result = await ToastConfirm(vehicleData);
          if (result.isConfirmed) {
            // Continuar con el código
          } else {
            // Usuario canceló, puedes manejar esta lógica si es necesario
            setToogleLoader(false);
            return;
          }
        }
      }
      if (vehicleData?.alertas) {
        temp = UpdateAlerts(vehicleData, expense, temp);
        if (Object.entries(temp.alertas).some(([key, value]) => value === "" || Number(value) < 1)) {
          //Esto me lo dio el chat gpt para solucionar el tema de alertas en rojo
          let notification = {
            patente: vehicleData.patente,
            alert: {},
            viewed: false,
            fecha: rightNow,
            hora: rightNowHora,
          };
          for (const [key, value] of Object.entries(temp.alertas)) {
            if (value === "" || Number(value) < 1) {
              const alertValue = value as any;
              await ToastRed.fire({
                icon: "warning",
                title: `Ya se cumplió el plazo para ${key}, te pasaste ${alertValue.toString().slice(1)} kilómetros`,
                allowEscapeKey: false,
              });

              notification = {
                ...notification,
                alert: { ...notification.alert, [key]: value },
              };
            }
          }
          saveNotification("notifications", notification);
        }
      }
      await Promise.all([
        addDoc(collectionRef, {
          ...info,
          precio: Number(info.precio),
          ingresa: currentUser,
        }),
        expense.kilometraje !== 0 ? updateDoc(docRef, temp) : "",
        axios.post(`https://brainy-shift-clam.cyclic.app/api/send-email`, messageToMail),
      ]);
      resetExpense();
      navigate(-1);
      setToogleLoader(false);
      await Toast.fire({
        icon: "success",
        title: "Gasto Agregado",
      });
      return;
    } catch (error) {
      setToogleLoader(false);
      Swal.fire({
        title: "Ups!",
        text: `${error}`,
        icon: "error",
      });
    }
  };

  const updateExpense = async (id: string, title: string, info: any) => {
    setToogleLoader(true);
    let temp = Object.keys(info).reduce((acc: any, item: string) => {
      if (!info[item]) {
        acc[item] = "";
      } else {
        acc[item] = info[item];
      }
      return acc;
    }, {});

    let messageToMail = {
      to: `marianopividori93@gmail.com`,
      gasto: info.rubro,
      subRubro: info.subRubro,
      observaciones: info.observaciones,
      marca: info.marca,
      modelo: info.modelo,
      patente: info.patente,
      precio: info.precio,
      adjunto: info.file,
      edited: true,
      fecha: info.fecha,
      text: `Se editó un gasto del dia ${info.fecha}, ${info.rubro} ${info.subRubro && info.subRubro} con el detalle ${
        info.observaciones
      } en el vehiculo ${info.marca} ${info.modelo} ${info.patente} con un total de ${info.precio}`,
    };

    if (info.file && typeof info.file === "object") {
      const imageRef = ref(storage, `images/${info.file?.name}`);
      const [, getUrl] = await Promise.all([await uploadBytes(imageRef, info.file), await getDownloadURL(imageRef)]);
      temp.file = getUrl;
    }
    if (!expense.fecha) {
      expense.fecha = rightNow;
    }
    try {
      const docRef = doc(db, `gastos/${id}`);
      await updateDoc(docRef, temp);
      await axios.post(`https://brainy-shift-clam.cyclic.app/api/send-email`, messageToMail);
      navigate(-1);
      setToogleLoader(false);
      await Toast.fire({
        icon: "success",
        title: "Gasto modificado",
      });
      return;
    } catch (error) {
      Swal.fire({
        title: "Ups!",
        text: `${error}`,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    const collectionRef = collection(db, "gastos");

    // Subscribe to collection updates using onSnapshot
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        marca: doc.data().marca,
        modelo: doc.data().modelo,
        patente: doc.data().patente,
        fecha: doc.data().fecha,
        rubro: doc.data().rubro,
        subRubro: doc.data().subRubro,
        kilometraje: doc.data().kilometraje,
        precio: doc.data().precio,
        empresa: doc.data().empresa,
        observaciones: doc.data().observaciones,
        medioPago: doc.data().medioPago,
        numero: doc.data().numero,
        tarjeta: doc.data().tarjeta,
        banco: doc.data().banco,
        ingresa: doc.data().ingresa,
        file: doc.data().file,
        hora: doc.data().hora,
        ...doc.data(),
      }));

      setExpenses(updatedData);
      setFilteredExpenses(updatedData);
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <Provider
      value={{
        addExpense,
        handleAddFiles,
        marcAsViewed,
        saveExpense,
        removeExpense,
        handleWillDelete,
        handleFilteredExpenses,
        updateExpense,
        filteredExpenses,
        toogleLoader,
        willDelete,
        expenses,
        expense,
        notifications,
      }}
    >
      {children}
    </Provider>
  );
};

export default ExpensesProvider;
