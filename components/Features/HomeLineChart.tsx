"use client";
import { BloodsugarType } from "@/types/BloodSugarType";
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

  const LineChart = (props: { data: BloodsugarType[] }) => {
    const labels = props.data.map((item) => item.date);
    const data = props.data.map((item) => item.blood_sugar_level);
    return (
      <div>
        <Line
          data={{
            labels: labels,
            datasets: [
                
              {
                label: "All time",
                data: data,
                backgroundColor: "#77A1FF",
                tension: 0.4,
                borderJoinStyle: 'round',
                borderColor: '#407BFF',
                fill: true
              },

              // {
              //   label: "online tutorial subjects",
              //   data: [100, 120, 70, 174, 68, 132, 200, 100, 120, 70, 174, 68, 132, 200, 100, 120, 70, 174, 68, 132, 200, 
              //       100, 120, 70, 174, 68, 132, 200, 100, 120, 70, 174, 68, 132, 200, 100, 120, 70, 174, 68, 132, 200],
      
              //   backgroundColor: "purple",
              //   pointBackgroundColor: '#A6E2B8',
              //   tension: 0.4,
              //   borderJoinStyle: 'round',
              //   borderColor:'#A6E2B8',
           
              // },
            
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
  export default LineChart;