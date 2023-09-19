import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetInfo } from "../hooks/useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const transactionCollectionref = collection(db, "transactions");

  const [transactionsTotals, setTransactionsTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0,
  });

  const { userID } = useGetInfo();

  const getTransactions = async () => {
    let unsubscribe;

    try {
      const queryTransactions = query(
        transactionCollectionref,
        where("userID", "==", userID),
        orderBy("createAt")
      );

      unsubscribe = onSnapshot(queryTransactions, (onSnapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        onSnapshot.forEach((doc) => {
          const data = doc.data();

          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType == "expense") {
            totalExpenses += Number(data.transactionAmoute);
          } else {
            totalIncome += Number(data.transactionAmoute);
          }
        });

        setTransactions(docs);
        let balance = totalIncome - totalExpenses;
        setTransactionsTotals({
          balance,
          income: totalIncome,
          expenses: totalExpenses,
        });
      });
    } catch (err) {
      console.log(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionsTotals };
};
