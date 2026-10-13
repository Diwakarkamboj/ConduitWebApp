import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import userLogin from "../../services/userLogin";
import FormFieldset from "../FormFieldset";

function LoginForm({ onError }) {
  const [{ email, password }, setForm] = useState({ email: "", password: "" });
  const { setAuthState } = useAuth();
  const navigate = useNavigate();
  // 1. Added state to track if the password should be visible
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert email to lowercase for the login check
    const normalizedEmail = email.toLowerCase();

    userLogin({ email: normalizedEmail, password })
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
        type="email"
        name="email"
        required
        placeholder="Email"
        value={email}
        handler={inputHandler}
        autoFocus
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
      <button className="btn btn-lg btn-primary pull-xs-right">Login</button>
    </form>
  );
}

export default LoginForm;
