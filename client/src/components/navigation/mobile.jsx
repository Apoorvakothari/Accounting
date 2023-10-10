import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import * as userService from "../../services/user";

import "./mobile.css";

const MobileNavigation = ({ setUser }) => {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <div>
        <h1>Genix</h1>
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
  );
};

MobileNavigation.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default MobileNavigation;
