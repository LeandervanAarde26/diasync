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
            backgroundColor: ["#F0BB00", "#407BFF", "#301F7F"],
          },
        ],
        labels: ["Low", "Stable", "High"],
      }}
    
    />
  );
};
export default Doughnuts;
