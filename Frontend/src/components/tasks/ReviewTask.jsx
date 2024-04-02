import React, { useEffect, useState } from "react";
import { server } from "../../server";
import view from "../../assets/view.png";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: "29vw",
    height:"40vh",
    transform: 'translate(-50%, -50%)',
  },
};
const ReviewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(null); // Track the index of the hovered icon
  const [modalIsOpen1, setIsOpen1] = React.useState(false);
  const [index,setIndex]=useState(null) // Track the index of the hovered icon
  const eId = localStorage.getItem("eId");
  const [reject, setReject] = useState(false);
  const [select, setSelect] = useState(false);
  const [feedback,setFeedback]=useState("");

  const getTasks = async () => {
    try {
      const response = await fetch(`${server}/api/task/getByMidReview/${eId}`);
      //here Api is called for getting task which are in review
      let jsonData = await response.json();
      console.log({jsonData});
      let reviewEmployeeProject=[];
      jsonData.forEach((data)=>{
        data.employees.forEach((employee)=>{
          if(employee.isWaited==="1"){
            reviewEmployeeProject.push({employee,task_id:data.task_id,manager_id:data.manager_id,team:data.team,description:data.description,percentage_alloted:data.percentage_alloted,start_date:data.start_date,deadline:data.deadline})
          }
        })
      })
      setTasks(reviewEmployeeProject);
      console.log(reviewEmployeeProject);
      
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  function openModal1() {
    setIsOpen1(true);
    
  }

  function afterOpenModal1() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal1() {
    setIsOpen1(false);
  }
  const HandleModal1=(indx)=>{
    openModal1();
    setIndex(indx);
    setSelect(true);

  }
  const HandleModal2=(indx)=>{
    openModal1();
    setIndex(indx);
    setReject(true);
  }
  const handleSubmit = async () => {
    let data = {
      emp:tasks[index],feedback:feedback
    }
    console.log({data})
    if(select){data.emp["isWaited"]="0";
  data.emp["isComplete"]="1";
  data.emp["isRejected"]="0";
}
    if(reject){data.emp["isWaited"]="0";
    data.emp["isComplete"]="0";
    data.emp["isRejected"]="1";
  }
    
    console.log({data})
    const response = await fetch(`${server}/api/task/updateTaskOfEmployeeReview/${eId}/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log({response})
    if(response.ok)
    window.location.reload();
    setSelect(false);
    setReject(false);
    closeModal1();
  }
  return (
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
            <th>Project  Id</th>
            <th>Project</th>
            <th>Employee Id</th>
            <th>Name</th>
            <th>Percenatge Alloted</th>
            {/* <th>Hours Alloted</th> */}
            <th>Hours Taken</th>
            <th>Start date</th>
            <th>Deadline</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{task.task_id}</td>
              <td>{task.description}</td>
              <td>{task.employee.employee_id}</td>
              <td>{task.employee.name}</td>
              <td>{task.employee.percentage_alloted}</td>
             
               <td>{task.employee.hours}</td> 
              <td>{task.start_date.split("T")[0]}</td>
              <td>{task.deadline.split("T")[0]}</td>
             
              <td>
              <div className="btn29">
                <div>
                <button style={{background:"green"}} onClick={() => HandleModal1(index)}>Accept</button>
                </div>
                <div>
                <button style={{background:"red"}} onClick={() => HandleModal2(index)}>Reject</button>

                </div>
                    
                  </div>
              </td>

            </tr>
          ))}
        </tbody>
        <Modal
        isOpen={modalIsOpen1}
        onAfterOpen={afterOpenModal1}
        onRequestClose={closeModal1}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="feedback">
       <span>FeedBack</span>
        </div>
        <div className="feedbackArea">
       <textarea style={{width:"100%",height:"20vh"}} onChange={(e)=>setFeedback(e.target.value)}></textarea>

        </div>
        <div className="btn34">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </Modal>

      </table>
    </div>
  );
};

export default ReviewTask;
