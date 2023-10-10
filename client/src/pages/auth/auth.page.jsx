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
      <h1 className="Genix">Genix</h1>
      <h3>{showSignUpForm ? "Welcome to Genix" : "Welcome back!"}</h3>
      {showSignUpForm ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
      <Link onClick={() => setShowSignUpForm(!showSignUpForm)}>
        {showSignUpForm
          ? "Already a user? Log in here."
          : "New to Genix? Sign up here."}
      </Link>
    </div>
  );
};

AuthPage.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default AuthPage;
