import React, { useEffect, useState } from "react";
import { server } from "../../server";
import view from "../../assets/view.png";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core/styles";
import './task.css'
import Modal from "react-modal";
const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const CompletedTask = () => {
  const [tasks, setTasks] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(null); // Track the index of the hovered icon
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [index,setIndex]=useState(null) // Track the index of the hovered icon

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

  const HandleModal=(indx)=>{
    openModal();
    setIndex(indx)
  }
  useEffect(() => {
    getTasks();
  }, []);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

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
            <th>Project Id</th>
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
                    onClick={() => HandleModal(index)}

                  >
                    {focusedIndex === index ? <InfoIcon /> : <InfoOutlinedIcon />}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="mainModal">
          <div className="sp1">
        <span>Project Name:{tasks[index]?.description}</span>

          </div>
          <div
      className="Econtainer"
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
            <th>Employee Id</th>
            <th>Name</th>
            <th>Hours Alloted</th>
            <th>Percenatge Alloted</th>
            <th>Work Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks[index]?.employees.map((data,ind)=>(
            <tr key={ind+1}>
              <td>{ind+1}</td>
              <td>{data.employee_id}</td>
              <td>{data.name}</td>
              <td>{data.hours_alloted}</td>
              <td>{data.percentage_alloted}</td>
              <td>{data.isComplete==="1"?("Completed"):(data.isRejected==="1"?("Rejected"):("Review"))}</td>
            </tr>
          ))}
        </tbody>
        </table>
        
        
      </div>
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
        <button style={{background:"red"}}onClick={closeModal}>close</button>
        </div>
      </Modal>
    </div>
  );
};

export default CompletedTask;
