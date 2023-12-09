import Swal from "sweetalert2";
import { FullVehicles } from "../interfaces/interfaces";
import { DocumentData } from "firebase/firestore";

export const Toast = Swal.mixin({
  toast: true,
  position: "top",
  iconColor: "white",
  background:"#008f39",
  color:"white",
  customClass: {
    popup: "colored-toast swal2-icon-success",
  },
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});
export const ToastRed = Swal.mixin({
  toast: true,
  position: "top",
  iconColor: "white",
  background:"#990000",
  color:"white",
  customClass: {
    popup: "colored-toast swal2-icon-success",
  },
  showConfirmButton: true,
  confirmButtonColor:"#0b0909",
  timerProgressBar: true,
});

export const ToastConfirm = (vehicleData:DocumentData) => Swal.fire({
  icon: "warning",
  title: `El kilometraje ingresado es mas de 1000 kilómetros mayor que el último registrado (${vehicleData?.kilometraje} km). ¿Estás seguro de continuar?`,
  showCancelButton: true,
  customClass: {
    title:"my-swal-title"
  },
  confirmButtonText: "Sí, continuar",
  cancelButtonText: "Cancelar",
});