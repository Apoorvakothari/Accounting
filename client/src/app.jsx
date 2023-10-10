import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "../../components/Navigation/Navigation";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import ExpensesPage from "../ExpensesPage/ExpensesPage";
import IncomesPage from "../IncomesPage/IncomesPage";
import LandingPage from "../LandingPage/LandingPage";
import TransactionsPage from "../TransactionsPage/TransactionsPage";

import "./App.css";

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
