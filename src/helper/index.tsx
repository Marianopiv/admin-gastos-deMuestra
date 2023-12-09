import moment from "moment";
import {
  ExpenseSaved,
  Expenses,
  FullVehicles,
  FullVehiclesModel,
  Rubros,
  RubrosFetched,
} from "../interfaces/interfaces";
import { DocumentData } from "firebase/firestore";
import { Toast } from "../UI/CustomAlert";

export const rightNow = moment().format("DD/MM/YYYY");
export const rightNowForPlaceHolder = moment().format("YYYY-MM-DD");

export const formatPlaceholder = (date: any) => moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");

export const sliceExpenses = (array: Expenses[], itemsPerPage: number, page: number) => {
  return array?.slice(itemsPerPage * (page - 1), itemsPerPage * page);
};

export const sortExpenses = (array: Expenses[] | any[]) => {
  return array.sort((a, b) => {
    const dateA = moment(a.fecha, "DD/MM/YYYY").valueOf();
    const dateB = moment(b.fecha, "DD/MM/YYYY").valueOf();

    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      // Si las fechas son iguales, ordenar por hora en orden descendente
      const timeA = moment(a.hora, "HH:mm:ss").valueOf();
      const timeB = moment(b.hora, "HH:mm:ss").valueOf();
      return timeB - timeA;
    }
  });
};
//Convertir date a formato para poder comparar
export const convertDate = (fecha: string) => moment(fecha, "DD/MM/YYYY").valueOf();
//Esta función es para que lleguen correctamente los datos de la patente, independientemente si es el estilo de patente viejas o las nuevas.
export const convertHours = (time: string) => moment(time, "HH:mm:ss").valueOf();

export const lastCreated = (array: Expenses[]) => sortExpenses(array).slice(0, 1)[0];
export const agruparPatente = (value: string, index1: number, index2: number, index3: number) =>
  (value.split(" ")[index1] + value.split(" ")[index2] + value.split(" ")[index3]).replace(/undefined/g, "");

export const filtrarPorMarcaOModelo = (array: FullVehicles[]) => {
  var marcasUnicas: any = [];
  return array.filter(function (objeto) {
    if (marcasUnicas.includes(objeto.marca)) {
      return false; // No incluir objetos con marcas repetidas
    } else {
      marcasUnicas.push(objeto.marca);
      return true;
    }
  });
};

export const show = (fullVehicles: FullVehicles[], option: string | undefined) => {
  switch (option) {
    case "marca":
      return filtrarPorMarcaOModelo(fullVehicles);

    case "modelo":
      return filtrarPorMarcaOModelo(fullVehicles);
    default:
      return sortByAlphabeth(fullVehicles);
  }
};

export const sortByAlphabeth = (fullVehicles: FullVehicles[]) =>
  fullVehicles.sort((a, b) => a.marca.localeCompare(b.marca));

export const sortByAlphabethRubro = (rubros: Rubros[]) => rubros.sort((a, b) => a.rubro.localeCompare(b.rubro));

export const sortByAlphabethSubRubro = (subRubros: (string | number)[]) =>
  subRubros.sort((a, b) => (a as string).localeCompare(b as string));

export const sortAlerts = (alerts: any) => alerts.sort((a: any, b: any) => a[0].localeCompare(b[0]));

export function eliminarInicio20(fecha: string) {
  var partes = fecha.split("/");

  if (partes.length === 3) {
    var [dia, mes, anio] = partes;

    if (dia.length === 2 && mes.length === 2 && anio.startsWith("20")) {
      return `${dia}/${mes}/${anio.slice(2)}`;
    }
  }

  return fecha;
}

export const UpdateAlerts = (vehicleData: DocumentData, expense: ExpenseSaved, temp: any) => {
  let ObjectModifiedUpdated: any = Object.entries(vehicleData.alertas).map(([key, value]: [string, any]) => {
    if (key === expense.subRubro || key === expense.rubro) {
      Toast.fire({
        icon: "success",
        title: "Alerta resetada correctamente",
      });
      return [key, vehicleData.alertasSeteadas[key]];
    } else {
      return [key, value - (Number(expense.kilometraje) - Number(vehicleData?.kilometraje))];
    }
  });
  ObjectModifiedUpdated = ObjectModifiedUpdated.reduce((obj: any, [key, value]: [string, number]) => {
    obj[key] = value;
    return obj;
  }, {});
  return { ...temp, alertas: { ...ObjectModifiedUpdated } };
};

export const validateAlert = (alert: Object) => {
  return Object.values(alert).every((val) => val !== undefined && val !== "");
};

export const getLastKm = (vehicles: FullVehiclesModel[], expense: ExpenseSaved) => {
  const result = vehicles.find((vehicle) => vehicle.patente.replace(/ /g, "") === expense.patente);
  return result?.kilometraje;
};

//Agregar Subrubros y rubros sin sub para alertas

export const compareRubro = (array: Rubros[], rubro: Rubros) => {
  const result = array.find((obj) => obj.id === rubro.id);
  return result ? result.id : "not found";
};

export const createIndex = (subRubros: Rubros) => {
  return subRubros ? Object.keys(subRubros).length : 0;
};

export const replaceSpaces = (str: string) => str.replace(/ /g, "_");

export const getFullSubRubros = (rubros: RubrosFetched[]) => {
  return rubros
    .filter((obj: RubrosFetched) => obj.subRubro)
    .reduce((acc:any, curr:any) => {
      return [...acc, ...Object.values(curr.subRubro)];
    }, []);
};
