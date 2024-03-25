import React from 'react';
import { Bar,Pie} from 'react-chartjs-2';
// import './Dashboard.css'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend,ArcElement);

const Dashboard = () => {
  return (
    <div className='dashboard'>
    <div className="cht" style={{ width: '20%', margin: 'auto' }}>
      <Bar
        data={{
          labels: ['Frontend', 'Backend', 'Data Analyst', 'Sales'],
          datasets: [{
            label: 'Sample Dataset',
            data: [12, 19, 3, 5],
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
    <div className="cht" style={{ width: '15%', margin: 'auto' }}>
      <Pie
        data={{
          labels: ['Frontend', 'Backend', 'Data Analyst', 'Sales'],
          datasets: [{
            label: 'Sample Dataset',
            data: [12, 19, 3, 5],
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
  );
};

export default Dashboard;
