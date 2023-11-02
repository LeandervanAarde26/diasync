import FilterButtons from "../Common/FilterButtons.component";
import data from "../../static/Dash.json";
import ChartKey from "../Common/ChartKey";
import LineChart from "./HomeLineChart";
import { useContext } from "react";

import { ReadingsContext } from "@/store/Readings.Context";
import Loader from "../Common/Loader";

function HomeChart() {
  const { dat } = useContext(ReadingsContext);

  return (
    <div className="hidden sm:flex flex-col h-[52vh] bg-cswhite rounded-2xl p-5 gap-y-[5px]">
      {dat.length > 0 ? (
        <>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-x-[5px] items-center">
              <div className="w-[4px] h-[70%] bg-cspurple "></div>
              <h4 className="text-csblack">{data.chartHeading}</h4>
            </div>

            <div className="hidden sm:flex flex-row justify-end h-[40px]">
              <div className="flex flex-row">
                <FilterButtons
                  title={data.filter1}
                  roundedLeft="xl"
                  active={false}
                />
                <FilterButtons
                  title={data.filter2}
                  roundedRight="xl"
                  active={false}
                />
              </div>
            </div>
          </div>

          <LineChart data={dat} />
        </>
      ) : (
        <div className="flex flex-row gap-x-[5px] items-center">
          <Loader msg="Trying to fetch data..." />
        </div>
      )}
    </div>
  );
}

export default HomeChart;
