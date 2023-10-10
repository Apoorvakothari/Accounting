import { useState } from "react";
import PropTypes from "prop-types";

import { signUp } from "../../services/user";

import "./sign-up.css";

const SignUpForm = ({ setUser }) => {
    const [formData, setFormData] = useState({
        name: "",
        businessName: "",
        email: "",
        password: "",
        confirm: "",
        error: "",
    });

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            error: "",
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const user = await signUp(formData);
            setUser(user);
        } catch {
            setFormData({ ...formData, error: "Sign Up Failed - Try Again" });
        }
    };

    const disable = formData.password !== formData.confirm;

    return (
        <>
            <div className="sign-up">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <label>Business Name</label>
                    <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <label>Confirm</label>
                    <input
                        type="password"
                        name="confirm"
                        value={formData.confirm}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" disabled={disable}>
                        Sign Up
                    </button>
                </form>
            </div>
            <p className="error-message">&nbsp;{formData.error}</p>
        </>
    );
};

SignUpForm.propTypes = {
    setUser: PropTypes.func.isRequired,
};

export default SignUpForm;
