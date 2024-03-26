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

  const handleSubmit = async () => {
    // Form validation checks
    const mId = localStorage.getItem('eId');
    let employees = [{
      employee_id,
      name,
      percentage_alloted,
      hours_alloted,
      isComplete: "0",
      isRejected: "0",
      isWaited: "0"
    }];

    const data = {
      task_id: taskId,
      description,
      manager_id: mId,
      team,
      employees,
      start_date: "2024-03-25T17:00:00Z",
      deadline
    };
    console.log(data)
    try {
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
    <div className="container">
      <div className="LogDetailContaine">
        <h1>Task</h1>
        <div className="LogDetail">
          <div className="frmd">
            <label>Name</label>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <label>Task Id</label>
            <input
              placeholder="Task Id"
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
          <div className="frmd">
            <label>Alloted Hours</label>
            <input
              placeholder="Alloted Hours"
              value={hours_alloted}
              onChange={(e) => setHours_alloted(e.target.value)}
            />
          </div>
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
