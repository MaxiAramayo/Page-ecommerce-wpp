import { db } from "./firebase";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useFirebase = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);

  const getData = async () => {
    try {
      const dataRef = collection(db, "comercios");
      const q = query(dataRef);

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      console.log("Done");
    }
  };

  const getProductos = async (id) => {
    try {
      const dataRef = collection(db, "comercios");
      const q = query(dataRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setData(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      console.log("Done");
    }
  };

  return {
    data,
    error,
    getData,
    getProductos,
  };
};
