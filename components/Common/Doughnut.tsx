"use client";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
export type BloodSugarDoughnutType = {
  low: number, 
  stable: number,
  high: number
}
const Doughnuts = ({low, stable, high}: BloodSugarDoughnutType) => {
  return (
    <Doughnut
      data={{
        datasets: [
          {
            data: [low, stable, high],
            backgroundColor: ["#215FBD", "#A6E2B8", "#B1C399"],
          },
        ],
        labels: ["Low", "Stable", "High"],
      }}
      height={100} 
    />
  );
};
export default Doughnuts;
