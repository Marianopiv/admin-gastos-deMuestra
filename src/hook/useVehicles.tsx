import React, { useState } from "react";
import { db } from "../Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { FullVehicles, FullVehiclesModel } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { Toast } from "../UI/CustomAlert";
import { vehicleModel } from "../config/config";

const useVehicles = () => {
  const navigate = useNavigate();
  const [element, setElement] = useState<FullVehiclesModel>(vehicleModel);
  const [fullVehicles, setfullVehicles] = useState<FullVehicles[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setElement({ ...element, [name]: value });
  };

  const handlefullVehicles = (vehicles: FullVehicles[]) => {
    setfullVehicles(vehicles);
  };

  const saveVehicle = async (text: any) => {
    try {
      const collectionRef = collection(db, `vehiculos`);
      await addDoc(collectionRef, text);
      navigate(-1);
      await Toast.fire({
        icon: "success",
        title: "Vehiculo agregado",
      });
      return;
    } catch (error) {
      Swal.fire({
        title: "Ups!",
        text: `${error}`,
        icon: "error",
        confirmButtonText: "Cool",
      });
      navigate(-1);
    }
  };

  const updateVehicle = async (id: string, title: string, info: any,noClose:boolean) => {
    try {
      const docRef = doc(db, `vehiculos/${id}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const existingData = docSnap.data();
        const newData = { ...existingData, ...info, alertas: info.alertas};
        await updateDoc(docRef, newData);
        if (!noClose) {
          navigate(-1);
        }
        await Toast.fire({
          icon: "success",
          title: `${noClose?"Alerta eliminada del vehiculo":"Vehiculo modificado"}`,
        });
        return;
      } else {
        Swal.fire({
          title: "Error",
          text: "El documento no existe",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Ups!",
        text: `${error}`,
        icon: "error",
      });
    }
  };

  const removeVehicle = async (coleccion: string, id: string) => {
    try {
      Swal.fire({
        title: "Seguro queres eliminar este elemento?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        denyButtonText: `salir sin guardar`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(doc(db, coleccion, id));
          Swal.fire("Eliminado correctamente!", "", "success");
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

  const updateMultipleVehicles = async (vehicles: any[]) => {
    try {
      const batch = writeBatch(db);
      
      vehicles.forEach((vehicle) => {
        const docRef = doc(db, `vehiculos/${vehicle.id}`);
        batch.update(docRef, vehicle);
      });
  
      await batch.commit();
            await Toast.fire({
        icon: "success",
        title: "Alerta de vehiculos actualizadas",
      });
    } catch (error) {
      Swal.fire({
        title: "Ups!",
        text: `${error}`,
        icon: "error",
      });
    }
  };

  return {
    saveVehicle,
    handleInput,
    removeVehicle,
    handlefullVehicles,
    updateVehicle,
    updateMultipleVehicles,
    fullVehicles,
    element,
  };
};

export default useVehicles;
