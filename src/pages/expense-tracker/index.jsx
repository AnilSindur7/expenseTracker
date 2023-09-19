import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionsTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetInfo();

  const [description, setDescription] = useState("");
  const [transactionAmoute, setTransactionAmoute] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionsTotals;

  let totalIncaome = 0;
  let totalExpense = 0;
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    addTransaction({
      description,
      transactionAmoute,
      transactionType,
    });
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);

      localStorage.clear();

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            <h2>
              {balance >= 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
            </h2>
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${income}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>${expenses}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Amoute"
              value={transactionAmoute}
              required
              onChange={(e) => {
                setTransactionAmoute(e.target.value);
              }}
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType == "expense"}
              onChange={(e) => {
                setTransactionType(e.target.value);
              }}
            />
            <label htmlFor="expense">Expenses</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType == "income"}
              onChange={(e) => {
                setTransactionType(e.target.value);
              }}
            />
            <label htmlFor="income">Income</label>
            <button type="submit">Add Tansaction</button>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile-photo" src={profilePhoto}></div>
        )}
        <button className="sign-out-button" onClick={signUserOut}>
          Sign out
        </button>
      </div>
      <div className="transactions">
        <h3>Transaction</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmoute, transactionType } =
              transaction;

            return (
              <li>
                <h4>{description}</h4>
                <p>
                  ${transactionAmoute}.{" "}
                  <label
                    style={{
                      color: transactionType == "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
