import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import { jwtDecode } from "jwt-decode";

import Logo from "../../data/logo.png";
import Loading from "../../data/loader.gif";

import { ValueContext } from "../../Context";

import { useNavigate } from "react-router-dom";

function Login() {
  const { setUser, setName, setShow } = useContext(ValueContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setOpen(true);
    fetch("http://127.0.0.1:8000/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.type === "email" || res.type === "password") {
          setError(true);
        }
        const user = jwtDecode(res.token);
        setUser(user.user);
        setName(user.user.fullName.charAt(0));
        localStorage.setItem("userId", user.user._id);

        // setShow()
        navigate("/posts");
      })
      .catch((err) => console.log(err));
  };

  const handleRemember = () => {
    if (email !== "") {
      window.localStorage.setItem("email", email);
    }
    if (password !== "") {
      window.localStorage.setItem("password", password);
    }
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("email");
    const rememberedPassword = localStorage.getItem("password");
    setEmail(rememberedEmail);
    setPassword(rememberedPassword);
  }, []);

  return (
    <div className="login">
      <div className="signin_form">
        <div className="sig_form">
          <img
            src={Logo}
            alt="pharmapool logo"
            width={80}
            onClick={() => navigate("/")}
          />
          <div className="other_inputs">
            {error && (
              <div className="error_message" style={{ textAlign: "center" }}>
                <p>Invalid email or password</p>
              </div>
            )}
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className={open ? "login_button_select" : "login_button"}
          >
            Log in
            {open && (
              <img src={Loading} alt="loading" width={100} height={100} />
            )}
          </button>

          <div className="remember">
            <div className="me">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                onChange={handleRemember}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="forgot">
              <a href="#">Forgot password</a>
            </div>
          </div>
          <p>
            Not a user,{" "}
            <i>
              click to{" "}
              <a href="/signup">
                <b>Register</b>
              </a>
            </i>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
