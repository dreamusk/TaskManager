import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(Tooltip, Legend);

const Piechart = () => {
  return (
    <div>
      <Pie
        data={{
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: 'Sample Dataset',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'red',
              'blue',
              'yellow',
              'green',
              'purple',
              'orange',
            ],
            borderColor: 'white',
            borderWidth: 1,
          }],
        }}
        options={{
          plugins: {
            legend: {
              position: 'right',
            },
          },
          layout: {
            padding: 30,
          },
        }}
        height={400}
        width={400}
      />
    </div>
  )
}

export default Piechart