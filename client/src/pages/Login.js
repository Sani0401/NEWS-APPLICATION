import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import logo from "../icons/images.png";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInput = () => {
    if (username.length === 0 || password.length === 0) {
      toast.error("User Name of Password Incomplete");
    }
    const body = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:3001/login", body)
      .then((response) => {
        console.log(response);
        navigate("/Landing", {
          state: { userData: response.data.loggedUser[0].username },
        });
      })
      .catch((error) => {
        console.error("Error", error.message);
      });
  };

  return (
    <>
      <div className="mainContainer">
        <div className="inputContainer">
          <div className="inputHeader">
            <img src={logo} alt="loading" className="inputLogo" />
            <h3 className="inputTitle"> Newzz</h3>
          </div>

          <div className="inputForm">
            <input
              placeholder="Enter Username"
              className="inputUserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Enter Password"
              className="inputPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-outline-secondary"
              onClick={handleInput}
            >
              Login
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
