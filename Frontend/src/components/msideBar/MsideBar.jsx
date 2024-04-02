import React, { useState } from "react";
import "./msiderBar.css";
import employee from "../../assets/Employee.png";
import tsagd from "../../assets/tsagd.png";
import Logo from "../../assets/Logo.png";
import tdone from "../../assets/tdone.png";
import query from "../../assets/query.png";
import AllTask from "../../assets/Alltask.png";
import suggestion from "../../assets/suggestion.png";
import Graph from "../../assets/Graph.png";
import emp from "../../assets/emp.png";
import review from "../../assets/review.png";
import { Link, useParams } from "react-router-dom";
import AssignmentReturnedTwoToneIcon from '@material-ui/icons/AssignmentReturnedTwoTone';
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone';
import EmojiObjectsTwoToneIcon from '@material-ui/icons/EmojiObjectsTwoTone';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const MsideBar = (props) => {
  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const [clicked4, setClicked4] = useState(false);
  const [clicked5, setClicked5] = useState(false);
  const [clicked6, setClicked6] = useState(false);
  const [profile, setProfile] = useState(false);
  const handleClick1 = () => {
    setClicked1(true);
    setClicked2(false);
    setClicked3(false);
    setClicked4(false);
    setClicked5(false);
    setClicked6(false);
    // Additional actions you want to perform upon click
}
const handleClick2 = () => {
  setClicked2(true);
  setClicked1(false);
  setClicked3(false);
  setClicked4(false);
  setClicked5(false);
  setClicked6(false);
  // Additional actions you want to perform upon click
}
const handleClick3= () => {
  setClicked3(true);
  setClicked2(false);
  setClicked1(false);
  setClicked4(false);
  setClicked6(false);
  setClicked5(false);
  // Additional actions you want to perform upon click
}
const handleClick4 = () => {
  setClicked4(true);
  setClicked2(false);
  setClicked3(false);
  setClicked1(false);
  setClicked6(false);
  setClicked5(false);
  // Additional actions you want to perform upon click
}
const handleClick5 = () => {
  setClicked5(true);
  setClicked2(false);
  setClicked3(false);
  setClicked1(false);
  setClicked6(false);
  setClicked4(false);
  // Additional actions you want to perform upon click
}
const handleClick6 = () => {
  setClicked6(true);
  setClicked2(false);
  setClicked3(false);
  setClicked1(false);
  setClicked5(false);
  setClicked4(false);
  // Additional actions you want to perform upon click
}
const {Item}=props;

let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

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

  const handleSignOut=()=>{
    localStorage.clear();
    window.location.href = '/login';
  }
  return (
    <div className="main">
      <div className="Msidecontainer">
        <div className="msd13">
          <img src={Logo}></img>
        </div>
        <Link to={`/asignTask`}>
        <div className={`mtaskGiven1 ${clicked1 ? 'clicked1' : ''}`} onClick={handleClick1}>
          <div className="mtaskGivenImage">
          <img src={tsagd} ></img>
          </div>
          <div className="mtaskGivenText">
         
            <span>
             Assign Project
            </span>
       
          </div>
        </div>
        </Link>
        <Link to={`/allTask`}>
        <div className={`mtaskGiven5 ${clicked5 ? 'clicked5' : ''}`} onClick={handleClick5}>
          <div className="mtaskGivenImage">
          <img src={AllTask} ></img>
          </div>
          <div className="mtaskGivenText">
         
            <span>
             All Project
            </span>
       
          </div>
        </div>
        </Link>
        <Link to={`/completedTask`}>
        <div className={`mtaskGiven2 ${clicked2 ? 'clicked2' : ''}`} onClick={handleClick2}>
          <div className="mtaskGivenImage">
          <img src={tdone} ></img>
          </div>
          <div className="mtaskGivenText">
          
            <span>
            Completed Project
            </span>
            
          </div>
        </div>
        </Link >
        <Link to='/reviewTask'>
        <div className={`mtaskGiven3 ${clicked3 ? 'clicked3' : ''}`} onClick={handleClick3}>
          <div className="mtaskGivenImage">
          <img src={review} ></img>
          </div>
          <div className="mtaskGivenText">
            <span>
            Project Review
            </span>
          </div>
        </div>
        </Link>
        <Link to='/register'>
        <div className={`mtaskGiven6 ${clicked6 ? 'clicked6' : ''}`} onClick={handleClick6}>
          <div className="mtaskGivenImage" id="sugg">
          <img src={emp} ></img>
          </div>
          <div className="mtaskGivenText">
            <span>
             Add user
            </span>
          </div>
        </div></Link>

        <Link to='/employeePerformance'>
        <div className={`mtaskGiven4 ${clicked4 ? 'clicked4' : ''}`} onClick={handleClick4}>
          <div className="mtaskGivenImage" id="sugg">
          <img src={Graph} ></img>
          </div>
          <div className="mtaskGivenText">
            <span>
             Performance
            </span>
          </div>
        </div></Link>
      
      </div>
      <div className="mnAndB">
      <div className="MNavcontainer">
        <div className="mnavBarContent">
          <div className="mimg1">
        <img src={employee} onClick={()=>setProfile(!profile)}></img>

          </div>
        {profile ?(<>

        <div className="mbut12">

        <div className="mbut1">
          
          <button>Profile</button>
         
          </div>
          <div className="mbut1">
          
          <button onClick={handleSignOut}>SignOut</button>
         
          </div>
        </div>
          </>
        )
        
        
        
        
        
        : null}
          
        </div>
      </div>
      <Item></Item>
      </div>
      
    </div>
  );
};

export default MsideBar;
