import React, { useEffect, useState } from "react";
import "./employee.css";
import { server } from "../../server";
import done from '../../assets/done.png'
import Np from '../../assets/Np.png'
const Employee = () => {
  const [tasks, setTasks] = useState([]);
  const [hours,setHours]=useState(0);
  const eId = localStorage.getItem("eId");

  const getTasks = async () => {
    try {
      const response = await fetch(`${server}/api/task/getByEid/${eId}`);
      const jsonData = await response.json();
      console.log({jsonData});
      
      if (Array.isArray(jsonData)) { // Check if jsonData is an array
        let filteredTasks = jsonData.filter((task) => task.employees.some((employee) => employee.employee_id === eId && employee.isEmployeeT==="1"));
        setTasks(filteredTasks);
      } else {
        console.error("Data returned from the server is not in the expected format (not an array)");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  const handleSubmit = async (index) => {
    let data = {
      emp:tasks[index]
    }
    console.log({data})
  let mId=tasks[index].manager_id
  data.emp["isComplete"]="0";
  data.emp["isRejected"]="0";
  data.emp["isWaited"]="1";
  data.emp["isEmployeeT"]="0";
  data.emp["hours"]=hours;
  const response = await fetch(`${server}/api/task/TaskUpdateByEmployee/${mId}/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if(response.ok)
  window.location.reload()
  }
  
  useEffect(() => {
    getTasks();
  }, []);

  return (
    
    <div className="Econtainer empty">
      {tasks.length === 0 ? (
      
      <>
      <div className="BgimgNoProject"></div>
      </>
      ) :(
        <>
        <table>
        <thead>
          <tr>
            <th>SrNo:</th>
            <th>Task Id</th>
            <th>Manager Id</th>
            <th>Team</th>
            <th>Description</th>
            <th>Percenatge Assigned</th>
            {/* <th>Hours Alloted</th> */}
            <th>Start date</th>
            <th>DeadLine</th>
            <th>Hours Contributed</th>
            <th>Submit</th>

          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index+1}>
              <td>{index+1}</td>
              <td>{task.task_id}</td>
              <td>{task.manager_id}</td>
              <td>{task.team}</td>
              <td>{task.description}</td>
              <td>{task.employees[0].percentage_alloted}</td>
              {/* <td>{task.employees[0].hours_alloted}</td> */}
              <td>{task.start_date.split("T")[0]}</td>
              <td>{task.deadline.split("T")[0]}</td>
              <td >
                <input
                style={{width:"80px",height:"20px",border:"1px solid #9D9BF1",borderRadius:"5px",padding:"5px",fontWeight:"900",fontSize:"13px"}}
                onChange={(e)=>setHours(e.target.value)}></input>
              </td>
              <td> <div className="btn2">
                <div className="imgic">
                  <img src={done} onClick={() => handleSubmit(index)} alt="" />
                </div>
              </div>
                </td>
              

            </tr>
          ))}
        </tbody>
      </table></>
      )}
      
    </div>
  );
};

export default Employee;

