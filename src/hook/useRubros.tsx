import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../Firebase";
import { useState, ChangeEvent } from "react";
import { Toast } from "../UI/CustomAlert";
import { Rubros, RubrosFetched } from "../interfaces/interfaces";
import { createIndex, replaceSpaces } from "../helper";

const useRubros = () => {
  const [rubro, setRubro] = useState("");
  const [toogleSubRubro, setToogleSubRubro] = useState(false);
  const [chosenRubro, setChosenRubro] = useState<Rubros>({
    id: "",
    rubro: "",
  });
  const handleRubro = (e: ChangeEvent<HTMLInputElement>, reset: boolean) => {
    const { value } = e.target;
    if (reset) {
      setRubro("");
    } else {
      setRubro(value);
    }
  };

  const handleSubRubro = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChosenRubro({ ...chosenRubro, [name]: value });
  };

  const handleToogleSubRubro = (obj: Rubros) => {
    setToogleSubRubro(!toogleSubRubro);
    setChosenRubro(obj);
  };
  const handleCloseSubRubro = () => {
    setToogleSubRubro(false);
  };

  const handleToogleSub = () => {
    setToogleSubRubro(!toogleSubRubro);
  };
  const saveRubro = async (coleccion: string, rubro: any) => {
    rubro = { rubro: rubro };
    try {
      const collectionRef = collection(db, coleccion);
      await addDoc(collectionRef, rubro);
      await Toast.fire({
        icon: "success",
        title: "Rubro Agregado",
      });
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

  const updateRubros = async (id: string, info: any) => {
    const docRef = doc(db, `rubros/${id}`);
    const docSnap = await getDoc(docRef); // Obtener los datos del gasto elegido
    let chosenRubro = docSnap.data();
    let temp;
    if (chosenRubro) {
      temp = { ...chosenRubro.subRubro, [createIndex(chosenRubro.subRubro)]: replaceSpaces(info.subRubro) };
    }
    try {
      const docRef = doc(db, `rubros/${id}`);
      await updateDoc(docRef, { ...chosenRubro, subRubro: temp });
      await Toast.fire({
        icon: "success",
        title: "subRubro agregado",
      });
      setRubro("");
      return;
    } catch (error) {
      Swal.fire({
        title: "Ups!",
        text: `${error}`,
        icon: "error",
      });
    }
  };

  const removeRubro = async (coleccion: string, rubro: RubrosFetched) => {
    try {
      Swal.fire({
        title: `Seguro queres eliminar este rubro: ${rubro.rubro} ?`,
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        denyButtonText: `salir sin guardar`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(doc(db, coleccion, rubro.id));
          await Toast.fire({
            icon: "success",
            title: "Rubro eliminado correctamente!",
          });
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

  const removeSubRubro = async (id: string, info: any, subRubro: string | number) => {
    let modifiedSub = Object.entries(info.subRubro).filter((item) => item[1] !== subRubro);
    info = { ...info, subRubro: Object.fromEntries(modifiedSub) };
    try {
      Swal.fire({
        title: `Seguro queres eliminar este subRubro: ${subRubro} ?`,
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        denyButtonText: `salir sin guardar`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const docRef = doc(db, `rubros/${id}`);
          await updateDoc(docRef, info);
          await Toast.fire({
            icon: "success",
            title: "subRubro eliminado",
          });
          setRubro("");
          return;
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
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
    rubro,
    toogleSubRubro,
    chosenRubro,
    handleRubro,
    handleCloseSubRubro,
    handleToogleSubRubro,
    handleToogleSub,
    handleSubRubro,
    removeRubro,
    removeSubRubro,
    saveRubro,
    updateRubros,
  };
};

export default useRubros;
