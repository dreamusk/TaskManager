// import React from 'react';
import { Bar,Pie,Line,Doughnut } from 'react-chartjs-2';
// import './Dashboard.css'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
  LineElement,

} from "chart.js";
import { server } from '../../../server';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend,ArcElement,PointElement,LineElement);

import React, { useEffect, useState } from 'react'
import './dash.css'
const Dashboard = () => {
  const [team, setTeam] = useState([]);
  const [id, setId] = useState([]);
  const eId=localStorage.getItem("eId")
  const [teamPerformanceData, setTeamPerformanceData] = useState([]);
  const [empC , setEmpC]=useState(0)
  const [empT , setEmpT]=useState(0)
  const getData=async()=>{
    let response=await fetch(`${server}/api/task/teamBarGraph/${eId}/`)
    let data=await response.json()
    setTeamPerformanceData(data)
    // console.log(response)
  }
  const Analize= async ()=>{
    let data={
      team,id
    }
    let response=await fetch(`${server}/api/task/getTaskOfEmployeeTeamAndEid/${eId}/`,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let datas=await response.json()
    setEmpC(datas[0].completed)
    setEmpT(datas[0].total)
    console.log(datas)
  }
  useEffect(() => {
    getData()
  },[])
  // Extracting labels and data for the charts
  const percentageCompletedData = teamPerformanceData?.map(item => {
    const percentageCompleted = item.total !== 0 ? (item.completed / item.total) * 100 : 0;
    return {
      team: item.team,
      percentageCompleted: percentageCompleted.toFixed(2) // Round to two decimal places
    };
  });
  
  // Extracting labels and data for the chart
  const teamLabels = percentageCompletedData.map(item => item.team);
  const percentageCompletedValues = percentageCompletedData.map(item => item.percentageCompleted);
  const completedData=teamPerformanceData?.map(item => item.completed);
  const totalData=teamPerformanceData?.map(item => item.total);
  return (
    <div className='dashboard'>
      <div className="cht1">
      <div className="fg">
      <div className="chtb" >
       <Bar
         data={{
           labels: teamLabels,
           datasets: [{
             label: 'Team Performance',
             data: percentageCompletedValues,
             backgroundColor: [
               'rgba(255, 99, 132, 0.7)', // Red
               'rgba(54, 162, 235, 0.7)', // Blue
               'rgba(255, 206, 86, 0.7)', // Yellow
               'rgba(75, 192, 192, 0.7)', // Green
             ],
             borderColor: [
               'rgba(255, 99, 132, 1)', // Red
               'rgba(54, 162, 235, 1)', // Blue
               'rgba(255, 206, 86, 1)', // Yellow
               'rgba(75, 192, 192, 1)', // Green
             ],
             borderWidth: 1,
           }],
         }}
         options={{
           scales: {
             y: {
               beginAtZero: true,
             },
             x: {
               type: 'category', // Use 'category' for categorical data
               ticks: {
                 autoSkip: false, // Prevent auto-skipping of labels
                 maxRotation: 0, // Rotate labels for better readability
                 minRotation: 0,
               },
             },
           },
         }}
         height={400}
         width={600}
       />
     </div>
      </div>
      <div className="fg">
      <div className="chtp" >
       <Doughnut 
         data={{
           labels: ['Completed', 'Total'],
           datasets: [{
             label: 'Task',
             data: [empC, empT],
             backgroundColor: [
               'rgba(255, 99, 132, 0.7)', // Red
               'rgba(54, 162, 235, 0.7)', // Green
             ],
             borderColor: [
               'rgba(255, 99, 132, 1)', // Red
               'rgba(54, 162, 235, 1)', // Blue
             ],
             borderWidth: 1,
           },],
         }}
         options={{
           plugins: {
             legend: {
               position: 'bottom',
             },
           },
         }}
         height={400}
         width={600}
       />
     </div>
      </div>
      </div>
      <div className="cht1">
      <div className="fg">
      <div className="chtb" >
       <Bar
         data={{
           labels: teamLabels,
           datasets: [{
            label: 'Total Task Assigned',
            data: totalData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)', // Red
              'rgba(54, 162, 235, 0.7)', // Blue
              'rgba(255, 206, 86, 0.7)', // Yellow
              'rgba(75, 192, 192, 0.7)', // Green
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', // Red
              'rgba(54, 162, 235, 1)', // Blue
              'rgba(255, 206, 86, 1)', // Yellow
              'rgba(75, 192, 192, 1)', // Green
            ],
            borderWidth: 1,
          },{
             label: 'Total Task Completed',
             data: completedData,
             backgroundColor: [
               'rgba(255, 99, 132, 0.7)', // Red
               'rgba(54, 162, 235, 0.7)', // Blue
               'rgba(255, 206, 86, 0.7)', // Yellow
               'rgba(75, 192, 192, 0.7)', // Green
             ],
             borderColor: [
               'rgba(255, 99, 132, 1)', // Red
               'rgba(54, 162, 235, 1)', // Blue
               'rgba(255, 206, 86, 1)', // Yellow
               'rgba(75, 192, 192, 1)', // Green
             ],
             borderWidth: 1,
           }],
         }}
         options={{
           scales: {
             y: {
               beginAtZero: true,
             },
             x: {
               type: 'category', // Use 'category' for categorical data
               ticks: {
                 autoSkip: false, // Prevent auto-skipping of labels
                 maxRotation: 0, // Rotate labels for better readability
                 minRotation: 0,
               },
             },
           },
         }}
         height={400}
         width={600}
       />
     </div>
      </div>
      <div className="buttns">
        <h1>Employee Analysis</h1>
      <div className='btns'>
        
      <div className="input3">
          <input type="text"  onChange={(e)=>{setTeam(e.target.value)}}  placeholder="Enter Team Name" />
          <input type="text" onChange={(e)=>{setId(e.target.value)}} placeholder='Enter Employee Id'/>
        </div>
        <div className="bt4">
        <button onClick={Analize}> Analize</button>
       
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Dashboard