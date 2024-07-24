import React, { useState } from "react";
import "./index.css";

import images from "../../data/images";

import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(true);
  const [code, setCode] = useState("");
  const _id = localStorage.getItem("userId");

  const handleSubmit = () => {
    fetch(`http://127.0.0.1:8000/api/auth/verify/${_id}`, {
      method: "POST",
      body: JSON.stringify({
        code,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success === true) {
          setVerified(true);
          navigate("/posts")
        }
      });
  };

  return (
    <div className="login">
      {verified && (
        <div className="signin_form">
          <div className="sig_form">
            <img
              src={images.logo}
              alt="pharmapool logo"
              width={80}
              onClick={() => navigate("/")}
            />
            <div className="other_inputs">
              <p>Enter verification code</p>
              <input
                type="text"
                placeholder="Email"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit} className="login_button">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
