import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";

import { useGetInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
  const transactionCollectionref = collection(db, "transactions");

  const { userID } = useGetInfo();

  const addTransaction = async ({
    description,
    transactionAmoute,
    transactionType,
  }) => {
    await addDoc(transactionCollectionref, {
      userID,
      description,
      transactionAmoute,
      transactionType,
      createAt: serverTimestamp(),
    });
  };

  return { addTransaction };
};
