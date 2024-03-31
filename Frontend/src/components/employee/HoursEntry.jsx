import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
function HoursEntry() {
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
      team,
      hours:hours_alloted,
      employee_id:localStorage.getItem("eId"),
      compeleted_percentage: percentage_alloted,
    };
    console.log(data)
    try {
      const response = await fetch(`${server}/api/hours/add/`, {
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
        alert('Hours Entry Successful :)');
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
        throw new Error('Hours Entry failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hours Entry failed :(');
    }
  };

  return (
    <div className="containerr">
      <div className="LogDetailContaine">
        <h1>Hours Entry</h1>
        <div className="LogDetail">
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
                style={{resize: 'none'}}
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
            <label>Completed %</label>
            <input
              placeholder="Percentage Completed"  
              value={percentage_alloted}
              onChange={(e) => setAltPer(e.target.value)}
            />
          </div>
          <div className="frmd">
            <label>Hours</label>
            <input
              placeholder="Hours"
              value={hours_alloted}
              onChange={(e) => setHours_alloted(e.target.value)}
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
  
export default HoursEntry