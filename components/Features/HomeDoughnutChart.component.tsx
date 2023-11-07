import data from "../../static/Dash.json";
import Doughnuts from "../Common/Doughnut";

type ChartProps = {
  show: boolean;
  low: number;
  stable: number;
  high: number;
};

export default function HomeDoughnutChart({ show, low, stable, high }: ChartProps) {
  return (
    <div
      className={
        show
          ? " hidden md:flex flex-row w-[55%] bg-cswhite rounded-3xl"
          : " flex md:hidden flex-col  w-[100%] h-[78vh] bg-cswhite rounded-3xl"
      }
    >
      <div className="flex flex-col w-[100%] p-5 justify-center pl-7 items-center">
        <h5 className="text-csblack">{data.bloodSugars}</h5>

        <div className="flex flex-col items-center">
          <h3 className="text-csblack">{low + high}%</h3>
          <p className="text-csblack text-xs w-100%">Unstable bloodusgar</p>
        </div>
      </div>

      <div className="flex flex-col justify-center   h-[100%] p-8 items-center w-[100%]">
        <Doughnuts low={low} stable={stable} high={high} />
      </div>
    </div>
  );
}

