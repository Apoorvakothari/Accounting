import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

import LoginForm from "../../components/login";
import SignUpForm from "../../components/signup";

import "./auth.css";

const AuthPage = ({ setUser }) => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <div className="auth-page">
      <h1 className="ledgerly">Ledgerly</h1>
      <h3>{showSignUpForm ? "Welcome to Ledgerly" : "Welcome back!"}</h3>
      {showSignUpForm ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
      <Link onClick={() => setShowSignUpForm(!showSignUpForm)}>
        {showSignUpForm
          ? "Already a user? Log in here."
          : "New to Ledgerly? Sign up here."}
      </Link>
    </div>
  );
};

AuthPage.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default AuthPage;
