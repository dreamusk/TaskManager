import React, { useState } from "react";
import "./register.css";
import bgimg from "./Bg.jpg";
import { Link,useNavigate } from "react-router-dom";
import { server } from "../../server";
function Register() {
  const navigate=useNavigate();
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [is_admin, setIs_admin] = useState(false);
  const [gmail, setGmail] = useState("");
  const [gender, setGender] = useState("");
  const handleRegister = async() => {
    // Form validation checks
    if (!name || !designation || !teamName || !password || !dob || !employee_id || !gmail || !gender) {
        alert("Please fill in all fields.");
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(gmail)) {
        alert("Invalid email address.");
        return;
    }

    // Validate password length
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    // Parse the date of birth string into a Date object
    const dobDate = new Date(dob);

    // Calculate the age
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dobDate.getFullYear();
    const monthDiff = currentDate.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())) {
        age--;
    }
    if (age<=0) {
      alert("Enter valid DOB");
      return;
  }
  let tage=18-age;
  if (age<18) {
    alert(`Not yet ready come after ${tage} years :)`);
    return;
}
    // Now `age` contains the calculated age
    console.log("Age:", age);

    // If all validations pass, proceed with registration
    const data = {
        name,
        designation,
        team:teamName,
        password,
        age,
        employee_id,
        gmail,
        gender,
        is_admin
    };
    let response= await fetch(`${server}/api/employee/register/`,{
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  console.log(response)
  if(response.ok)console.log("Registered")
  else{
    alert(`Not Registered  :(`);
    return;
}

   
    setName("");
    setDesignation("");
    setTeamName("");
    setPassword("");
    setDob("");
    setGmail("");
    setGender("");
    setEmployee_id("");
    if(response.ok){
      alert('Registered')
    navigate("/login")}
};

  return (
    <div className="container">
      <div className="LogDetailContaine">
        <h1>Registration</h1>
        <div className="LogDetail">
          <div className="frmd">
            <label>Name</label>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
    {/* This is targeting post method of django backend which is located in api/employee/view/views*/}
          </div> 
          <div className="frmd">
            <label>Designation</label>
            <input
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
          </div>
          <div className="frmd">
            <label>Team</label>
            
          <input
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          </div>
          <div className="frmd">
            <label>D.O.B</label>
            
          <input
            placeholder="DOB"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          </div>
          <div className="frmd">
            <label>Gender</label>
            
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="" hidden>Select an option</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="other">other</option>
          </select>
          </div>
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
          <div className="frmd">
            <label>Gmail</label>
            
          <input
            placeholder="Gmail"
            type="email"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
          />
          </div>
        </div>
        <div id="c112">

        <div className="btn1" >
          <button  onClick={handleRegister}>Add</button>
        </div>
        </div>
      </div>
      
    </div>
  );
}

export default Register;
