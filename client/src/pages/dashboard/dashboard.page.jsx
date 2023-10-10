import PropTypes from "prop-types";

import "./dashboard-page.css";

const DashboardPage = ({ user }) => {
  return (
    <div className="dashboard-page">
      <h1 className="ledgerly hidden">Ledgerly</h1>
      <div>
        <h2>{user.businessName}</h2>
        <p>
          Welcome to Ledgerly, <span>{user.name}</span>
        </p>
        <p>This page is under development 🛠️</p>
      </div>
      <div></div>
    </div>
  );
};

DashboardPage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    businessName: PropTypes.string.isRequired,
  }).isRequired,
};

export default DashboardPage;
