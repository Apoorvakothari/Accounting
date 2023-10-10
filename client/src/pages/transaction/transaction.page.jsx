import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";

import TransactionsFilterForm from "../../components/transaction-filter-form";
import * as expensesAPI from "../../api/expense";
import * as incomesAPI from "../../api/income";

import "./transaction.css";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState({});
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const componentRef = useRef(null);

  const categories = ["All Categories"];
  for (let i = 0; i < transactions.length; i++) {
    if (!categories.includes(transactions[i].category)) {
      categories.push(transactions[i].category);
    }
  }

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const [incomesData, expensesData] = await Promise.all([
          incomesAPI.getIncomes(),
          expensesAPI.getExpenses(),
        ]);
        const mergedTransactions = [
          ...incomesData.map((transaction) => ({
            ...transaction,
            isExpense: false,
          })),
          ...expensesData.map((transaction) => ({
            ...transaction,
            isExpense: true,
          })),
        ];
        mergedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(mergedTransactions);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTransactions();
  }, []);

  useEffect(() => {
    let filteredTransactions = transactions.filter((transaction) => {
      if (
        selectedCategory !== "" &&
        transaction.category !== selectedCategory
      ) {
        return false;
      }

      if (
        selectedDateRange.startDate !== "" &&
        selectedDateRange.endDate !== ""
      ) {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(selectedDateRange.startDate);
        const endDate = new Date(selectedDateRange.endDate);

        if (transactionDate < startDate || transactionDate > endDate) {
          return false;
        }
      }

      return true;
    });

    setFilteredTransactions(filteredTransactions);
  }, [transactions, selectedCategory, selectedDateRange]);

  const incomeTotal = filteredTransactions
    .filter((transaction) => !transaction.isExpense)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expensesTotal = filteredTransactions
    .filter((transaction) => transaction.isExpense)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const cashFlow = incomeTotal - expensesTotal;

  function handleCardClick(id) {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  }

  return (
    <div className="transaction-page" ref={componentRef}>
      <h1 className="heading">Transactions</h1>
      <div className="row">
        <h1>
          Income: <span>${incomeTotal}</span>
        </h1>
        <h1>
          Expenses: <span>${expensesTotal}</span>
        </h1>
        <h1>
          Cash Flow:{" "}
          <span className={`${cashFlow <= 0 ? "red" : "green"}`}>
            ${cashFlow}
          </span>
        </h1>
        <ReactToPrint
          trigger={() => (
            <button id="print">
              Print PDF&nbsp;&nbsp;<i className="fa-solid fa-print"></i>
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <TransactionsFilterForm
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
      />
      <div>
        <ul className="cards-ctr">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction._id}
              onClick={() => handleCardClick(transaction._id)}
              className={`card ${
                expandedCard === transaction._id ? "card-expanded" : ""
              }`}
            >
              <div
                className={`${transaction.isExpense ? "red-bar" : "green-bar"}`}
              ></div>
              <div className="row">
                <div className="card-main row">
                  <div>
                    <p className="large">{transaction.description}</p>
                    <p>
                      <i className="fa-solid fa-calendar"></i>&nbsp;
                      {transaction.date.slice(0, 10)}
                    </p>
                  </div>
                  <p className="large">${transaction.amount}</p>
                </div>
              </div>
              <div className="row expanded">
                <p>
                  <i className="fa-solid fa-folder"></i>&nbsp;
                  {transaction.category}
                </p>
                <p>
                  <i className="fa-solid fa-receipt"></i>&nbsp;
                  {transaction.account}
                </p>
                {transaction.notes ? (
                  <p>
                    <i className="fa-solid fa-comment"></i>&nbsp;
                    {transaction.notes}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionsPage;
