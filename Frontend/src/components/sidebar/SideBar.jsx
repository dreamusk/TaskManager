import React, { useState } from "react";
import "./sidebar.css";
import employee from "../../assets/Employee.png";
import tsagd from "../../assets/tsagd.png";
import Logo from "../../assets/Logo.png";
import tdone from "../../assets/tdone.png";
import query from "../../assets/query.png";
import suggestion from "../../assets/suggestion.png";

import AssignmentReturnedTwoToneIcon from '@material-ui/icons/AssignmentReturnedTwoTone';
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone';
import EmojiObjectsTwoToneIcon from '@material-ui/icons/EmojiObjectsTwoTone';
const SideBar = () => {
  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const [clicked4, setClicked4] = useState(false);
  const [profile, setProfile] = useState(false);
  const handleClick1 = () => {
    setClicked1(!clicked1);
    setClicked2(false);
    setClicked3(false);
    setClicked4(false);
    // Additional actions you want to perform upon click
}
const handleClick2 = () => {
  setClicked2(!clicked2);
  setClicked1(false);
  setClicked3(false);
  setClicked4(false);
  // Additional actions you want to perform upon click
}
const handleClick3= () => {
  setClicked3(!clicked3);
  setClicked2(false);
  setClicked1(false);
  setClicked4(false);
  // Additional actions you want to perform upon click
}
const handleClick4 = () => {
  setClicked4(!clicked4);
  setClicked2(false);
  setClicked3(false);
  setClicked1(false);
  // Additional actions you want to perform upon click
}
  return (
    <div className="main">
      <div className="Sidecontainer">
        <div className="sd13">
          <img src={Logo}></img>
        </div>
        <div className={`taskGiven1 ${clicked1 ? 'clicked1' : ''}`} onClick={handleClick1}>
          <div className="taskGivenImage">
          <img src={tsagd} ></img>
          </div>
          <div className="taskGivenText">
            <span>
              Task Assigned 
            </span>
          </div>
        </div>
        <div className={`taskGiven2 ${clicked2 ? 'clicked2' : ''}`} onClick={handleClick2}>
          <div className="taskGivenImage">
          <img src={tdone} ></img>
          </div>
          <div className="taskGivenText">
            <span>
              Task Completed 
            </span>
          </div>
        </div>
        <div className={`taskGiven3 ${clicked3 ? 'clicked3' : ''}`} onClick={handleClick3}>
          <div className="taskGivenImage">
          <img src={query} ></img>
          </div>
          <div className="taskGivenText">
            <span>
              Query
            </span>
          </div>
        </div>
        <div className={`taskGiven4 ${clicked4 ? 'clicked4' : ''}`} onClick={handleClick4}>
          <div className="taskGivenImage" id="sugg">
          <img src={suggestion} ></img>
          </div>
          <div className="taskGivenText">
            <span>
              Suggestion
            </span>
          </div>
        </div>
      </div>
      <div className="Navcontainer">
        <div className="navBarContent">
          <div className="img1">
        <img src={employee} onClick={()=>setProfile(!profile)}></img>

          </div>
        {profile ?(<>

        <div className="but12">

        <div className="but1">
          
          <button>Profile</button>
         
          </div>
          <div className="but1">
          
          <button>SignOut</button>
         
          </div>
        </div>
          </>
        )
        
        
        
        
        
        : null}
          
        </div>
      </div>
    </div>
  );
};

export default SideBar;
