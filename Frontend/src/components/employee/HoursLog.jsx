import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../../server";

const HoursLog = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const [empData,SetEmpData]=useState([])
  
  const eId = localStorage.getItem("eId");
  let temPdta=[];
  const getTasks = async () => {
    try {
      const response = await fetch(`${server}/api/hours/getById/${eId}/`);
    
      const jsonData = await response.json();
      console.log({jsonData});
      setTasks(jsonData);
      SetEmpData(temPdta);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div className="Econtainer">
      <table>
        <thead>
          <tr>
            <th>SrNo:</th>
            <th>Task Id</th>
            {/* <th>Manager Id</th> */}
            <th>Team</th>
            <th>Description</th>
            <th>Hours Contributed</th>
            <th>Percenatge Completd</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{task.task_id}</td>
              <td>{task.team}</td>
              <td>{task.description}</td>
              <td>{task.hours}</td>
              <td>{task.completed_percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HoursLog;
