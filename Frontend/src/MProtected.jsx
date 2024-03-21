import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import SideBar from './components/sidebar/SideBar';
import MsideBar from './components/msideBar/MsideBar';
const MProtected = (props) => {
  const {Component}=props;
  const navigate=useNavigate();
  useEffect(()=>{
    let login=localStorage.getItem('login');
    let admin=localStorage.getItem('admin')
    if(!login||!admin)navigate('/login')
  }) 
  return (
    <div>
      <MsideBar Item={Component}></MsideBar>
      </div>
  )
}

export default MProtected