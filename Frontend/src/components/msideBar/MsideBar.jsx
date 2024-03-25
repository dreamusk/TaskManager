import React, { useState } from "react";
import "./msiderBar.css";
import employee from "../../assets/Employee.png";
import tsagd from "../../assets/tsagd.png";
import Logo from "../../assets/Logo.png";
import tdone from "../../assets/tdone.png";
import query from "../../assets/query.png";
import AllTask from "../../assets/Alltask.png";
import suggestion from "../../assets/suggestion.png";
import { Link, useParams } from "react-router-dom";
import AssignmentReturnedTwoToneIcon from '@material-ui/icons/AssignmentReturnedTwoTone';
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone';
import EmojiObjectsTwoToneIcon from '@material-ui/icons/EmojiObjectsTwoTone';
const MsideBar = (props) => {
  const [clicked1, setClicked1] = useState(true);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const [clicked4, setClicked4] = useState(false);
  const [clicked5, setClicked5] = useState(false);
  const [profile, setProfile] = useState(false);
  const handleClick1 = () => {
    setClicked1(true);
    setClicked2(false);
    setClicked3(false);
    setClicked4(false);
    setClicked5(false);
    // Additional actions you want to perform upon click
}
const handleClick2 = () => {
  setClicked2(true);
  setClicked1(false);
  setClicked3(false);
  setClicked4(false);
  setClicked5(false);
  // Additional actions you want to perform upon click
}
const handleClick3= () => {
  setClicked3(true);
  setClicked2(false);
  setClicked1(false);
  setClicked4(false);
  setClicked5(false);
  // Additional actions you want to perform upon click
}
const handleClick4 = () => {
  setClicked4(true);
  setClicked2(false);
  setClicked3(false);
  setClicked1(false);
  setClicked5(false);
  // Additional actions you want to perform upon click
}
const handleClick5 = () => {
  setClicked5(true);
  setClicked2(false);
  setClicked3(false);
  setClicked1(false);
  setClicked4(false);
  // Additional actions you want to perform upon click
}
const {Item}=props;
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
             Asign Task
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
             All Task
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
            Completed Task
            </span>
            
          </div>
        </div>
        </Link >
        <Link to='/reviewTask'>
        <div className={`mtaskGiven3 ${clicked3 ? 'clicked3' : ''}`} onClick={handleClick3}>
          <div className="mtaskGivenImage">
          <img src={query} ></img>
          </div>
          <div className="mtaskGivenText">
            <span>
            Task Review
            </span>
          </div>
        </div>
        </Link>
        <Link to='/employeePerformance'>
        <div className={`mtaskGiven4 ${clicked4 ? 'clicked4' : ''}`} onClick={handleClick4}>
          <div className="mtaskGivenImage" id="sugg">
          <img src={suggestion} ></img>
          </div>
          <div className="mtaskGivenText">
            <span>
             Employee Performance
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
          
          <button>SignOut</button>
         
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
