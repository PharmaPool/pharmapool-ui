import React, { useState } from "react";
import "./index.css";

import images from "../../data/images";
import Loader from "../../components/Loader";

import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const _id = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    fetch(`https://pharmapoolserver.com/api/auth/verify/${_id}`, {
      method: "POST",
      body: JSON.stringify({
        code,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.success === true) {
          navigate("/signin");
          setLoading(false);
        }
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="login">
          <div className="signin_form">
            <div className="sig_form">
              <img
                src={images.logo}
                alt="pharmapool logo"
                width={80}
                onClick={() => navigate("/")}
              />
              <div className="other_inputs">
                <p style={{ color: "green" }}>Successful!</p>
                <p>Check your mail for the verification code</p>
                <p>Enter verification code</p>
                <input
                  type="text"
                  placeholder="6 digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  style={{ width: "50%", margin: "1rem auto" }}
                  autoFocus
                />
              </div>
              <button onClick={handleSubmit} className="login_button">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
