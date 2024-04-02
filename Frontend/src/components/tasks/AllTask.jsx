import React, { useEffect, useState } from "react";
import { server } from "../../server";
import view from "../../assets/view.png";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core/styles";
import './asignTask.css'
import Modal from "react-modal";
import { TabScrollButton } from "@material-ui/core";
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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement');
const AllTask = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [tasks, setTasks] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [edit,setEdit]=useState(false)
  const [edits,setEdits]=useState(false)
  const [index,setIndex]=useState(null) // Track the index of the hovered icon
  const [index1,setIndex1]=useState(null) // Track the index of the hovered icon
  // const [taskById, setTaskById] = useState({});
 const [task_id,setTask_id]=useState(null)
 const [team,setTeam]=useState(null)
 const [description,setDescription]=useState(null)
 const [percentage_Completed,setPercentage_Completed]=useState(null)
 const [start_date,setStart_date]=useState(null)
 const [deadline,setDeadline]=useState(null)
  const eId = localStorage.getItem("eId");
const [employee_id,setEmployee_id]=useState(null)
const [hours_alloted,setHours_alloted]=useState(null)
const [percentage_alloted,setPercentage_alloted]=useState(null)
const [workStatus,setWorkStatus]=useState("")
const [name,setName]=useState(null)
  const getTasks = async () => {
    try {
      const response = await fetch(`${server}/api/task/getByMid/${eId}`);
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
  const handleEdit=async(indx)=>{
    setTask_id(tasks[indx].task_id)
    setTeam(tasks[indx].team)
    setDescription(tasks[indx].description)
    setPercentage_Completed(tasks[indx].percentage_Completed)
    setStart_date(tasks[indx].start_date)
    setDeadline(tasks[indx].deadline)
  
    setEdit(true)
    setIndex(indx)


   
  }
  const handleEdits=async(indx)=>{
    setIndex1(indx)
    setEdits(true)
    setEmployee_id (tasks[index].employees[indx].employee_id)
    setHours_alloted(tasks[index].employees[indx].hours_alloted)
    setPercentage_alloted(tasks[index].employees[indx].percentage_alloted)
    if(tasks[index].employees[indx].isComplete==="0"){
    setWorkStatus("Review")
    }
    else if(tasks[index].employees[indx].isComplete==="1"){
      setWorkStatus("Completed")
    }
    setName(tasks[index].employees[indx].name)

  }
  const updateTask=async()=>{
    let emp={};
    tasks[index].employees.forEach((data)=>{
      if(data.employee_id===eId){
        emp=data
      }
    })
    let data={
      employee_id:eId,
      task_id:tasks[index].task_id,
      tlid:task_id,
      team,
      description,
      percentage_Completed,
      start_date,
      deadline,
      isComplete:emp.isComplete,
      isRejected:emp.isRejected,
      isWaited:emp.isWaited,
      isCompleted:emp.isCompleted,
    }
    console.log({data})
    const response = await fetch(`${server}/api/task/updateByManager/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      
    })
    console.log(response)
    if(response.ok)
    window.location.reload()
  }
  const handleDelete=async(indx)=>{
      const response = await fetch(`${server}/api/task/deleteByManager/${tasks[indx].task_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if(response.ok)
      window.location.reload()
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
  const handleEditsEmployee=async(indx)=>{
    setEdits(false)

    let data={
      eid:tasks[index].employees[indx].employee_id,
      employee_id,
      hours_alloted,
      percentage_alloted,
      workStatus,
      name
    }
    console.log({data})
    const response = await fetch(`${server}/api/task/employeeReviewEmployeeDetailEditByManager/${tasks[index].task_id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      
    })
    console.log(response)
      if(response.ok)
      window.location.reload()
  }
  const HandleRemove=async(indx)=>{
    const data={
      eid:tasks[index].employees[indx].employee_id
    }
    const response = await fetch(`${server}/api/task/removeEmployeeFromTask/${tasks[index].task_id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      
    })
    if(response.ok)
    window.location.reload()
  }
  function closeModal() {
    setIsOpen(false);
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
            <th>Project Id</th>
            <th>Team</th>
            <th>Description</th>
            <th>Completed %</th>
            <th>Start date</th>
            <th>Deadline</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, indx) => (
            <tr key={indx + 1}>
             {(edit===true&&index===indx)?(
              <>
               <td>{indx + 1}</td>
               <td><input value={task_id}
               onChange={(e)=>setTask_id(e.target.value)}
               style={{width:"90px",height:"20px",border:"1px solid black",borderRadius:"5px"}}
               
               ></input></td>
               <td><input
               value={team}
               onChange={(e)=>setTeam(e.target.value)}
               style={{width:"90px",height:"20px",border:"1px solid black",borderRadius:"5px"}}
               
               ></input></td>
               <td><input
               value={description}
               onChange={(e)=>setDescription(e.target.value)}
               style={{width:"90px",height:"20px",border:"1px solid black",borderRadius:"5px"}}
               
               ></input></td>
               <td><input
               value={percentage_Completed}
               onChange={(e)=>setPercentage_Completed(e.target.value)}
               style={{width:"90px",height:"20px",border:"1px solid black",borderRadius:"5px"}}
               
               ></input></td>
               <td><input
               value={start_date}
               onChange={(e)=>setStart_date(e.target.value)}
               style={{width:"90px",height:"20px",border:"1px solid black",borderRadius:"5px"}}
               
               ></input></td>
               <td><input
               value={deadline}
              onChange={(e)=>setDeadline(e.target.value)}
               style={{width:"90px",height:"20px",border:"1px solid black",borderRadius:"5px"}}
               
               ></input></td>
               </>
             ):( 
             <><td>{indx + 1}</td>
              <td>{task.task_id}</td>
              <td>{task.team}</td>
              <td>{task.description}</td>
              <td>{task.percentage_Completed}</td>
              <td>{task.start_date.split("T")[0]}</td>
              <td>{task.deadline.split("T")[0]}</td></>)}
             
              <td>
                <div className="btn2">
                  <div
                    className="imgic"
                    onMouseEnter={() => setFocusedIndex(indx)}
                    onMouseLeave={() => setFocusedIndex(null)}
                    style={{cursor:"pointer"}}
                    onClick={() => HandleModal(indx)}
                  >
                    {focusedIndex === indx ? <InfoIcon /> : <InfoOutlinedIcon />}
                  </div>
                </div>
              </td>
              
              <td>
                <div className="btn29">
                  {(edit===true&&index===indx)?(
                    <>
                   <button style={{ background: "#004b23" }} onClick={updateTask}>Save</button>

                    <button style={{ background: "#bf0603" }} onClick={()=>setEdit(false)}>Cancel</button>
                  </>
                  ):(
                  <>
                  <button style={{ background: "darkgreen" }} onClick={()=>handleEdit(indx)}>Edit</button>
                  <button style={{ background: "red" }}onClick={()=>handleDelete(indx)}>Delete</button></>)}
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
            <th>Alloted %</th>
            <th>Work Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks[index]?.employees.map((data,ind)=>(
             <tr key={ind+1}>
            {(edits===true&&index1===ind)?(
              <>
              <td>{ind+1}</td>
              <td>
              <input value={employee_id}
               onChange={(e)=>setEmployee_id(e.target.value)}
               style={{width:"95px",height:"20px",border:"1px solid black",borderRadius:"5px",textAlign:"center"}}
               
               ></input>
              </td>
              <td>
              <input value={name}
               onChange={(e)=>setName(e.target.value)}
               style={{width:"95px",height:"20px",border:"1px solid black",borderRadius:"5px",textAlign:"center"}}
               
               ></input>
              </td>

              <td>
              <input value={hours_alloted}
               onChange={(e)=>setHours_alloted(e.target.value)}
               style={{width:"95px",height:"20px",border:"1px solid black",borderRadius:"5px",textAlign:"center"}}
               
               ></input>
              </td>
              <td>
              <input value={percentage_alloted}
               onChange={(e)=>setPercentage_alloted(e.target.value)}
               style={{width:"95px",height:"20px",border:"1px solid black",borderRadius:"5px",textAlign:"center"}}
               
               ></input>
              </td>
              <td>
              {/* <input value={workStatus}
               onChange={(e)=>setWorkStatus(e.target.value)}
               style={{width:"90px",height:"20px",border:"1px solid black",borderRadius:"5px"}}
               
               ></input> */}
               <select value={workStatus} onChange={(e)=>setWorkStatus(e.target.value)}
               style={{width:"95px",height:"25px",border:"1px solid black",borderRadius:"5px",color:"black",fontSize:"14px"}}
               >

               <option value="Completed">Completed</option> 
               <option value="Review">Review</option>
               </select>
              </td>
              </>
            ):(<>
             
              <td>{ind+1}</td>
              <td>{data.employee_id}</td>
              <td>{data.name}</td>
              <td>{data.hours_alloted}</td>
              <td>{data.percentage_alloted}</td>
              <td>{data.isComplete==="1"?("Completed"):(data.isRejected==="1"?("Rejected"):("Review"))}</td>
              
           
            </>)}
            <td>

                <div className="btn29">
                  {(edits===true&&index1===ind)?(
                    <>
                   <button style={{ background: "#004b23" }} onClick={()=>handleEditsEmployee(ind)}>Save</button>

                    <button style={{ background: "#bf0603" }} onClick={()=>setEdits(false)}>Cancel</button>
                  </>
                  ):(
                  <>
                  <button style={{ background: "darkgreen" }} onClick={()=>handleEdits(ind)}>Edit</button>
                  <button style={{ background: "red" } } onClick={()=>HandleRemove(ind)}>Remove</button></>)}
                </div>
              </td>
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

export default AllTask;

