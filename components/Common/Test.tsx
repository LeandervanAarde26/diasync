"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
  );

  const MyLineChart = () => {
    return (
      <div>
        <Line
          data={{
            labels: [
              "2023-01",
              "2023-02",
              "2023-03",
              "2023-04",
              "2023-05",
              "2023-06",
              "2023-07",
              "2023-01",
              "2023-02",
              "2023-03",
              "2023-04",
              "2023-05",
              "2023-06",
              "2023-07",
              "2023-01",
              "2023-02",
              "2023-03",
              "2023-04",
              "2023-05",
              "2023-06",
              "2023-07",
              "2023-01",
              "2023-02",
              "2023-03",
              "2023-04",
              "2023-05",
              "2023-06",
              "2023-07",
            ],
            datasets: [
                
              {
                label: "online tutorial subjects",
                data: [100, 120, 115, 134, 168, 132, 200, 100, 120, 115, 134, 168, 132, 200, 100, 120, 115, 134, 168, 132, 200, 100, 120, 115, 134, 168, 132, 200, 100, 120, 115, 134, 168, 132, 200, 100, 120, 115, 134, 168, 132, 200,100, 120, 115, 134, 168, 132, 200, 100, 120, 115, 134, 168, 132, 200,100, 120, 115, 134, 168, 132, 200],
                backgroundColor: "#A6E2B8",
                tension: 0.4,
                borderJoinStyle: 'round',
                borderColor: '#45D0EE',
                fill: true
              },

              {
                label: "online tutorial subjects",
                data: [100, 120, 70, 174, 68, 132, 200, 100, 120, 70, 174, 68, 132, 200, 100, 120, 70, 174, 68, 132, 200, 
                    100, 120, 70, 174, 68, 132, 200, 100, 120, 70, 174, 68, 132, 200, 100, 120, 70, 174, 68, 132, 200],
      
                backgroundColor: "purple",
                pointBackgroundColor: '#A6E2B8',
                tension: 0.4,
                borderJoinStyle: 'round',
                borderColor:'#A6E2B8',
           
              },
            
            ],
            
          }}
          height={'83%'}
          options={{
            responsive: true,

            plugins:{
                legend: {
                    display: true,
                    position: 'top',
                    align: 'center',
                    labels: {
                        color: 'darkred',
                        font: {
                           weight: 'bold'
                        },
                     }
                }
            }
          }}
        />
      </div>
    );
  };
  export default MyLineChart;