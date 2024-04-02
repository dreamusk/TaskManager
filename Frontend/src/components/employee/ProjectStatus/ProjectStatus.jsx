import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../../../server";

const ProjectStatus = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const [empData, SetEmpData] = useState([]);

  const eId = localStorage.getItem("eId");
  let temPdta = [];
  const getTasks = async () => {
    try {
      const response = await fetch(`${server}/api/task/getByEid/${eId}`);

      const jsonData = await response.json();
      // let filteredTasks=[];
      // jsonData.forEach((data)=>{

      //     data.employees.forEach((emp)=>{
      //       if(emp.isComplete==="1"){
      //         filteredTasks.push(data)
      //       }
      //   }
      //     )})
      jsonData?.forEach((data) => {
        data?.employees?.forEach((emp) => {
          if (emp.employee_id === eId) temPdta.push(emp);
        });
      });
      console.log({ temPdta });
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
            <th>Manager Id</th>
            <th>Team</th>
            <th>Description</th>
            {/* <th>Hours Alloted</th> */}
            <th>Assigned %</th>
            <th>Start date</th>
            <th>DeadLine</th>
            <th>Status</th>
            {/* <th>Remark</th> */}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{task.task_id}</td>
              <td>{task.manager_id}</td>
              <td>{task.team}</td>
              <td>{task.description}</td>
              {/* <td>{empData[index]?.hours_alloted}</td> */}
              <td>{empData[index]?.percentage_alloted}</td>
              <td>{task.start_date.split("T")[0]}</td>
              <td>{task.deadline.split("T")[0]}</td>
              <td>
                {empData[index]?.isComplete === "1" ? (
                  <p style={{ color: "#005B41" }}>Completed</p>
                ) : empData[index]?.isWaited === "0" ? (
                  <p style={{ color: "#FF204E" }}>Not Completed</p>
                ) : (
                  <p style={{ color: "#00224D" }}>Review</p>
                )}
              </td>
              {/* <td>{empData[index]?.remark}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectStatus;
