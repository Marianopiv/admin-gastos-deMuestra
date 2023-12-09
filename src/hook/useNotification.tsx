import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { db } from "../Firebase";

const useNotification = () => {
  const [notifications, setNotifications] = useState<
    { id: string; alert: any }[]
  >([]);

  const saveNotification = async (coleccion: string, info: any) => {
    try {
      const collectionRef = collection(db, coleccion);
      await addDoc(collectionRef, info);
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

  const marcAsViewed = async (coleccion: string) => {
    try {
      // Obtener una referencia a la colección de notificaciones
      const collectionRef = collection(db, coleccion);

      // Crear una consulta para obtener las notificaciones no vistas (viewed: false)
      const q = query(collectionRef, where("viewed", "==", false));

      // Obtener los documentos que cumplen con la consulta
      const querySnapshot = await getDocs(q);

      // Actualizar el campo "viewed" a true para cada notificación no vista
      const batch: any[] = [];
      querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        batch.push(updateDoc(docRef, { viewed: true }));
      });

      // Ejecutar las actualizaciones en lote
      await Promise.all(batch);
    } catch (error) {
      console.error("Error al marcar las notificaciones como vistas:", error);
    }
  };
  useEffect(() => {
    const collectionRef = collection(db, "notifications");

    // Subscribe to collection updates using onSnapshot
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        alert: doc.data().alert,
        viewed: doc.data().viewed,
        ...doc.data(),
      }));
      setNotifications(updatedData);
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);
  return { saveNotification, marcAsViewed, notifications };
};

export default useNotification;
