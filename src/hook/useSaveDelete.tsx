import { addDoc, collection, getDoc,  onSnapshot } from "firebase/firestore";
import Swal from "sweetalert2";
import { Expenses } from "../interfaces/interfaces";
import { useState } from "react";
import { db } from "../Firebase";
import { useEffect } from "react";

const useSaveDelete = () => {
  const [deleted, setDeleted] = useState<Expenses[]>([]);
  const [toogleDeleted, setToogleDeleted] = useState<boolean>(false);

  const saveDeleted = async (coleccion: string, info: any) => {
    const temp = Object.keys(info).reduce((acc: any, item: string) => {
      if (!info[item]) {
        acc[item] = "";
      } else {
        acc[item] = info[item];
      }
      return acc;
    }, {});
    try {
      const collectionRef = collection(db, coleccion);
      await addDoc(collectionRef, temp);
      return;
    } catch (error) {
      Swal.fire({
        title: "Ups!",
        text: `${error}`,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };
  useEffect(() => {
    const collectionRef = collection(db, "baja");

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
        ...doc.data(),
      }));
      setDeleted(updatedData)
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);


  const handleToogleDeleted = () => {
    setToogleDeleted(!toogleDeleted);
  };
  return { deleted, toogleDeleted, saveDeleted, handleToogleDeleted };
};

export default useSaveDelete;
