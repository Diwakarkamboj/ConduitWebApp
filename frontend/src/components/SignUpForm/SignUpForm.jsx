import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import userSignUp from "../../services/userSignUp";
import FormFieldset from "../FormFieldset";

function SignUpForm({ onError }) {
  const [{ username, email, password }, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  // 1. Added state to track if the password should be visible
  const [showPassword, setShowPassword] = useState(false);

  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert email to lowercase before sending to the backend
    const normalizedEmail = email.toLowerCase();

    userSignUp({ username, email: normalizedEmail, password })
      .then(setAuthState)
      .then(() => navigate("/"))
      .catch(onError);
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormFieldset
        name="username"
        required
        placeholder="Your Name"
        value={username}
        handler={inputHandler}
      ></FormFieldset>

      <FormFieldset
        name="email"
        type="email"
        required
        placeholder="Email"
        value={email}
        handler={inputHandler}
      ></FormFieldset>

      {/* 2. Wrapped the password field in a relative container for the icon */}
      <div style={{ position: "relative" }}>
        <FormFieldset
          name="password"
          type={showPassword ? "text" : "password"} // 3. Toggles between text and password        required
          required
          placeholder="Password"
          value={password}
          handler={inputHandler}
        ></FormFieldset>

        {/* 4. The clickable eye icon */}
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "15px",
            top: "20px", // Adjust this value slightly if the icon is too high or low
            cursor: "pointer",
            userSelect: "none",
            fontSize: "1.2rem"
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>

      <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
    </form>
  );
}

export default SignUpForm;
