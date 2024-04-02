import React, { useState } from "react";
import "./sidebar.css";
import employee from "../../assets/Employee.png";
import tsagd from "../../assets/tsagd.png";
import Logo from "../../assets/Logo.png";
import tdone from "../../assets/tdone.png";
import query from "../../assets/query.png";
import suggestion from "../../assets/suggestion.png";
import clock from "../../assets/clock.png";
import psub from "../../assets/psub.png";
import history from "../../assets/history.png";
import { Link, useParams } from "react-router-dom";
import AssignmentReturnedTwoToneIcon from "@material-ui/icons/AssignmentReturnedTwoTone";
import AssignmentTurnedInTwoToneIcon from "@material-ui/icons/AssignmentTurnedInTwoTone";
import QuestionAnswerTwoToneIcon from "@material-ui/icons/QuestionAnswerTwoTone";
import EmojiObjectsTwoToneIcon from "@material-ui/icons/EmojiObjectsTwoTone";
const SideBar = (props) => {
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
  };
  const handleClick2 = () => {
    setClicked2(true);
    setClicked1(false);
    setClicked3(false);
    setClicked5(false);
    setClicked6(false);
    setClicked4(false);
    // Additional actions you want to perform upon click
  };
  const handleClick3 = () => {
    setClicked3(true);
    setClicked2(false);
    setClicked1(false);
    setClicked5(false);
    setClicked6(false);
    setClicked4(false);
    // Additional actions you want to perform upon click
  };
  const handleClick4 = () => {
    setClicked4(true);
    setClicked2(false);
    setClicked3(false);
    setClicked5(false);
    setClicked6(false);
    setClicked1(false);
    // Additional actions you want to perform upon click
  };
  const handleClick5 = () => {
    setClicked5(true);
    setClicked2(false);
    setClicked3(false);
    setClicked4(false);
    setClicked6(false);
    setClicked1(false);
    // Additional actions you want to perform upon click
  };
  const handleClick6 = () => {
    setClicked6(true);
    setClicked2(false);
    setClicked3(false);
    setClicked4(false);
    setClicked5(false);
    setClicked1(false);
    // Additional actions you want to perform upon click
  };
  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  const { Item } = props;
  return (
    <div className="main">
      <div className="Sidecontainer">
        <div className="sd13">
          <img src={Logo}></img>
        </div>
        <Link to={`/employee`}>
          <div
            className={`taskGiven1 ${clicked1 ? "clicked1" : ""}`}
            onClick={handleClick1}
          >
            <div className="taskGivenImage">
              <img src={tsagd}></img>
            </div>
            <div className="taskGivenText">
              <span>Project Alloted</span>
            </div>
          </div>
        </Link>
        <Link to={`/ProjectSubmitted`}>
          <div
            className={`taskGiven6 ${clicked6 ? "clicked6" : ""}`}
            onClick={handleClick6}
          >
            <div className="taskGivenImage">
              <img src={psub}></img>
            </div>
            <div className="taskGivenText">
              <span>Project Submitted</span>
            </div>
          </div>
        </Link>
        <Link to={`/taskCompleted`}>
          <div
            className={`taskGiven2 ${clicked2 ? "clicked2" : ""}`}
            onClick={handleClick2}
          >
            <div className="taskGivenImage">
              <img src={query}></img>
            </div>
            <div className="taskGivenText">
              <span>Project Status</span>
            </div>
          </div>
        </Link>
        <Link to={`/hoursEntry`}>
          <div
            className={`taskGiven5 ${clicked5 ? "clicked5" : ""}`}
            onClick={handleClick5}
          >
            <div className="taskGivenImage" id="sugg">
              <img src={clock}></img>
            </div>
            <div className="taskGivenText">
              <span>Hours Entry</span>
            </div>
          </div>
        </Link>
        <Link to={`/hoursLog`}>
          <div
            className={`taskGiven3 ${clicked3 ? "clicked3" : ""}`}
            onClick={handleClick3}
          >
            <div className="taskGivenImage">
              <img src={history}></img>
            </div>
            <div className="taskGivenText">
              <span>Hours Entry Log</span>
            </div>
          </div>
        </Link>
        <Link to={`/suggestion`}>
          <div
            className={`taskGiven4 ${clicked4 ? "clicked4" : ""}`}
            onClick={handleClick4}
          >
            <div className="taskGivenImage" id="sugg">
              <img src={suggestion}></img>
            </div>
            <div className="taskGivenText">
              <span>Suggestion</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="nAndB">
        <div className="Navcontainer">
          <div className="navBarContent">
            <div className="img1">
              <img src={employee} onClick={() => setProfile(!profile)}></img>
            </div>
            {profile ? (
              <>
                <div className="but12">
                  <div className="but1">
                    <button>Profile</button>
                  </div>
                  <div className="but1">
                    <button onClick={handleSignOut}>SignOut</button>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <Item></Item>
      </div>
    </div>
  );
};

export default SideBar;
