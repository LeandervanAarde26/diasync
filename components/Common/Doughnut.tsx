"use client";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const Doughnuts = () => {
  return (
    <Doughnut
      data={{
        datasets: [
          {
            data: [30, 35, 35],
            backgroundColor: ["#215FBD", "#A6E2B8", "#B1C399"],
          },
        ],
        labels: ["Stable", "unstable", "controlled"],
      }}
      height={100} 
    />
  );
};
export default Doughnuts;
