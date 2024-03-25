import React, { useEffect, useState } from "react";
import { server } from "../../server";
import view from "../../assets/view.png";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core/styles";
import './task.css'
const CompletedTask = () => {
  const [tasks, setTasks] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(null); // Track the index of the hovered icon

  const eId = localStorage.getItem("eId");
  const getTasks = async () => {
    try {
      const response = await fetch(`${server}/api/task/getByMidCompleted/${eId}`);
      const jsonData = await response.json();
      setTasks(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div
      className="Econtainerr"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "5vw",
      }}
    >
      <table>
        <thead>
          <tr>
            <th>SrNo:</th>
            <th>Task Id</th>
            <th>Team</th>
            <th>Description</th>
            <th>Percenatge Completed</th>
            <th>Start date</th>
            <th>Deadline</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{task.task_id}</td>
              <td>{task.team}</td>
              <td>{task.description}</td>
              <td>{task.percentage_Completed}</td>
              <td>{task.start_date.split("T")[0]}</td>
              <td>{task.deadline.split("T")[0]}</td>
              <td>
                <div className="btn2">
                  <div
                    className="imgic"
                    onMouseEnter={() => setFocusedIndex(index)}
                    onMouseLeave={() => setFocusedIndex(null)}
                    style={{cursor:"pointer"}}
                  >
                    {focusedIndex === index ? <InfoIcon /> : <InfoOutlinedIcon />}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedTask;
