import React, { useEffect, useState } from "react";
import { server } from "../../server";
function ProjectSubmitted() {
  const eId = localStorage.getItem("eId");
  const [tasks, setTasks] = useState([]);
  const getTasks = async () => {
    try {
      const response = await fetch(`${server}/api/task/getByEid/${eId}`);
      const jsonData = await response.json();
      console.log({ jsonData });

      if (Array.isArray(jsonData)) {
        // Check if jsonData is an array
        let filteredTasks = jsonData.filter((task) =>
          task.employees.some(
            (employee) =>
              employee.employee_id === eId && employee.isWaited === "1"
          )
        );
        setTasks(filteredTasks);
      } else {
        console.error(
          "Data returned from the server is not in the expected format (not an array)"
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);
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
            <th>Percenatge Assigned</th>
            {/* <th>Hours Alloted</th> */}
            <th>Start date</th>
            <th>DeadLine</th>
            <th>Hours Contributed</th>
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
              <td>{task.employees[0].percentage_alloted}</td>
              {/* <td>{task.employees[0].hours_alloted}</td> */}
              <td>{task.start_date.split("T")[0]}</td>
              <td>{task.deadline.split("T")[0]}</td>

              <td>{task.employees[0].hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectSubmitted;
