import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Auth/authStore";
import type { RootState } from "../Auth/authStore";
import LoadingOverlay from "../Components/LoadingOverlay";
import "./Login.css";
const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    dispatch(login({ email, password }));
  };

  
  useEffect(() => {
    if (!loading) return;
    if (isAuthenticated) {
      setLoading(false);
      navigate("/dashboard");
    } else if (email && password) {
 
      setLoading(false);
      setError("Invalid email or password");
    }
  }, [isAuthenticated, loading, email, password, navigate]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <input
          className={`login-input${error === "Email and password are required" && !email.trim() ? " login-input-error" : ""}`}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            className={`login-input password-input${error === "Email and password are required" && !password.trim() ? " login-input-error" : ""}`}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="password-toggle"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>

      {error && <p className="login-error">{error}</p>}
      {loading && <LoadingOverlay text="Logging in..." />}
    </div>
  );
};

export default Login;
