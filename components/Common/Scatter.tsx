"use client";
import { BloodsugarType } from "@/types/BloodSugarType";
import "chart.js/auto";
import { Scatter } from "react-chartjs-2";

export type BloodSugarDoughnutType = {
  low: number;
  stable: number;
  high: number;
};
const Scatters = (props: {
  thisMonth: BloodsugarType[];
  lastMonth: BloodsugarType[];
}) => {
  return (
    <Scatter
      data={{
        datasets: [
          {
            label: 'This Month',
            data: [props.thisMonth],
            backgroundColor: ["#215FBD",],
          },
          {
            label: 'Last Month',
            data: [props.lastMonth],
            backgroundColor: ["#215FBD"],
          },
        ],
      }}
      height={100}
    />
  );
};
export default Scatters;
