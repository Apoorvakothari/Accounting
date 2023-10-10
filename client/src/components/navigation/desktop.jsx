import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import * as userService from "../../services/user";

import "./desktop.css";

const Navigation = ({ setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <>
      <nav className={`${menuOpen ? "open" : ""}`}>
        <div>
          <h1 className="Genix">Genix</h1>
        </div>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/income">Income</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="" onClick={handleLogOut}>
            <i className="fa-solid fa-right-from-bracket"></i> Log Out
          </Link>
        </div>
      </nav>
      <div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>
      </div>
    </>
  );
};

Navigation.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Navigation;
