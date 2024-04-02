import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import "./asignTask.css";

function AsignTask() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState("");
  const [percentage_alloted, setAltPer] = useState("");
  const [hours_alloted, setHours_alloted] = useState("");
  const [deadline, setDeadline] = useState("");
  const [taskId, setTaskId] = useState("");
  // var currentDate = new Date();

// Get the current date components
// new Date();
var date = new Date();
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    var day = ('0' + date.getDate()).slice(-2);
    const start_date= year + '-' + month + '-' + day;
console.log(start_date)
  const handleSubmit = async () => {
    // Form validation checks
    const mId = localStorage.getItem('eId');
    let employees = [{
      employee_id,
      percentage_alloted,
      hours_alloted,
      isComplete: "0",
      isRejected: "0",
      isWaited: "0",
      isEmployeeT: "1",
    }];

    const data = {
      task_id: taskId,
      description,
      manager_id: mId,
      team,
      employees,
      start_date,
      deadline
    };
    console.log(data)
    if(start_date>deadline){
      alert('Deadline Must  be After the start date');
      return;
    }
    try {
      let r=await fetch(`${server}/api/employee/eid/${employee_id}/`)
      r=await r.json();
      employees[0]['name']=r.name;
      const response = await fetch(`${server}/api/task/add/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      let datas=await response.json();
      console.log(datas)
      if(datas.status===202){
        alert('Employee Assigned Task Already :(');
        
      }
      else if (response.ok) {
        alert('Employee Assigned Task Successfully :)');
        setName('');
        setEmployee_id('');
        setDescription('');
        setTeam('');
        setAltPer('');
        setHours_alloted('');
        setDeadline('');
        setTaskId('');
        console.log("Registered");
      } 
      else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed :(');
    }
  };

  return (
    <div className="containerr">
      <div className="LogDetailContaine">
        <h1>Project</h1>
        <div className="LogDetail">
          {/* <div className="frmd">
            <label>Name</label>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div> */}
          <div className="frmd">
            <label>Employee Id</label>
            {/* <select  onChange={(e) => setEmployee_id(e.target.value)}>
              <option value="" hidden>Select an option</option>
              <option value="E1">E1</option>
              <option value="E2">E2</option>
              <option value="E3">E3</option>
              <option value="E4">E4</option>
              <option value="E5">E5</option>
              <option value="E6">E6</option>
              <option value="E7">E7</option>
              <option value="E8">E8</option>
              <option value="E9">E9</option>
              <option value="E10">E10</option>
            </select> */}
             <input
              placeholder="Employee Id"
              value={employee_id}
              onChange={(e) => setEmployee_id(e.target.value)}
            />
          </div> 
          <div className="frmd">
            <label>Project Id</label>
            <input
              placeholder="Project Id"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
            />
          </div>
          <div className="frmd">
            <label>Description</label>
           
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{resize:"none"}}
              />
           
          </div>
          <div className="frmd">
            <label>Team</label>
            <select onChange={(e) => setTeam(e.target.value)}>
              <option value="" hidden>Select an option</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="Dev_Ops">Dev_Ops</option>
              <option value="sales">sales</option>
            </select>
          </div>
          <div className="frmd">
            <label>Alloted %</label>
            <input
              placeholder="Percentage Alloted"
              value={percentage_alloted}
              onChange={(e) => setAltPer(e.target.value)}
            />
          </div>
          {/* <div className="frmd">
            <label>Alloted Hours</label>
            <input
              placeholder="Alloted Hours"
              value={hours_alloted}
              onChange={(e) => setHours_alloted(e.target.value)}
            />
          </div> */}
          <div className="frmd">
            <label>Deadline</label>
            <input
              placeholder="Deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
        </div>
        <div id="c112">
          <div className="btn1">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AsignTask;
