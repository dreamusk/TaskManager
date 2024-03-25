/* eslint-disable react/prop-types */

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({
  loading,
  orders,
  receivedOrders,
  approvedOrders,
  rejectedOrders,
}) => {
  const data = {
    labels: [
      "Total Orders",
      "Received Orders",
      "Accepted Orders",
      "Rejected Orders",
    ],
    datasets: [
      {
        label: "Orders Number",
        data: [
          10,
          11,
         12,
          13,
        ],
        backgroundColor: "#9D9BF1",
        borderColor: "#9D9BF1",
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  return (
    <>
    
          <div className="mt-8 md:mt-0 bg-gray-100 rounded-2xl px-8 pt-8">

                <div className="flex justify-center items-center gap-4">
                  
                  <div className="text-xl font-bold py-4">No of Orders</div>
                </div>

            <div className="flex justify-between">
              
             

            </div>
            
            <div className=" p-4" style={{ height: "90%" }}>
              <Skeleton isLoaded={!loading} height={"272px"}  fadeDuration={1}>

              <Bar data={data} options={options}></Bar>
              </Skeleton>
            </div>
          </div>
        </>
   
  );
};

export default BarChart;