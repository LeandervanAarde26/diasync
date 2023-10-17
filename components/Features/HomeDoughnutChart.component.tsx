import data from "../../static/Dash.json";
import Doughnuts from "../Common/Doughnut";

type ChartProps = {
  show: boolean;
  low: number, 
  stable: number,
  high: number
}

function HomeDoughnutChart({show, low, stable, high}: ChartProps) {
  return (
    <div className= 
    {
      show?
      " hidden md:flex flex-col w-[35%] bg-gradient-to-t from-[#252525] via-[#0B0B0B] to-[#000000] rounded-3xl"
      :
      " flex md:hidden flex-col w-[100%] h-[50vh] bg-gradient-to-t from-[#252525] via-[#0B0B0B] to-[#000000] rounded-3xl"
    }

    >
      <div className="flex flex-row w-[100%] p-5 justify-between pl-7 items-center">
        <h5 className="text-cswhite">{data.bloodSugars}</h5>

        <div className="flex flex-col items-center">
          <h3>{low + high}%</h3>
          <p className="text-cswhite text-xs w-100%">Unstable bloodusgar</p>
        </div>
      </div>
      <div className="flex flex-col  h-[65%] items-center w-[100%]">
        <Doughnuts
          low = {low}
          stable=  {stable}
          high = {high}
        />
      </div>
    </div>
  );
}

export default HomeDoughnutChart;
