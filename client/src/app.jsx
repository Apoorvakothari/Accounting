import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "./components/navigation/desktop";
import { getUser } from "./services/user";

import AuthPage from "./pages/auth/auth.page";
import DashboardPage from "./pages/dashboard/dashboard.page";
import ExpensesPage from "./pages/expense/expense.page";
import IncomesPage from "./pages/income/income.pages";
import LandingPage from "./pages/home/home.page";
import TransactionsPage from "./pages/transaction/transaction.page";

import "./app.css";

const App = () => {
  const [user, setUser] = useState(getUser());

  return (
    <>
      {user ? (
        <main className="app">
          <Navigation user={user} setUser={setUser} />
          <Routes className="routes">
            <Route path="/dashboard" element={<DashboardPage user={user} />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/income" element={<IncomesPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
          </Routes>
        </main>
      ) : (
        <main className="app">
          <Routes className="routes">
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage setUser={setUser} />} />
          </Routes>
        </main>
      )}
    </>
  );
};

export default App;
