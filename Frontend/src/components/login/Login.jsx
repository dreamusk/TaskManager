import React, { useEffect, useState } from "react";
import "./login.css";
import bgimg from "./Bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
function Login() {
  const [password, setPassword] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) navigate("/");
  });
  const handleLogin = async () => {
    const data = { employee_id, password };
    let response = await fetch(`${server}/api/employee/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setPassword("");
      setEmployee_id("");
      let temporaryEmployee = await fetch(
        `${server}/api/employee/eid/${employee_id}/`
      );
      temporaryEmployee = await temporaryEmployee.json();
      if (temporaryEmployee.is_admin) localStorage.setItem("admin", true);
      localStorage.setItem("login", true);
      localStorage.setItem("eId", employee_id);

      navigate("/");
    }
  };
  return (
    <div className="container">
      <div className="LogDetailContainer">
        <h1>Login</h1>
        <div className="LogDetail">
          <div className="frmd">
            <label>Employee Id</label>

            <input
              placeholder="Employee Id"
              value={employee_id}
              onChange={(e) => setEmployee_id(e.target.value)}
            />
          </div>

          <div className="frmd">
            <label>Password</label>

            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div id="c112">
          <div className="btn1" onClick={handleLogin}>
            <button>Login</button>
          </div>
          <div className="btn1" onClick={handleLogin}>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
