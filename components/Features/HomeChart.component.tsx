import FilterButtons from "../Common/FilterButtons.component";
import data from '../../static/Dash.json';
import ChartKey from "../Common/ChartKey";
import MyLineChart from "../Common/Test";
function HomeChart() {
    return (
        <div className="flex flex-col h-[55vh] bg-cswhite rounded-2xl p-5 gap-y-[10px]">
        <div className="flex flex-row gap-x-[5px] items-center">
          <div className="w-[4px] h-[70%] bg-cspurple "></div>
          <h4 className="text-csblack">{data.chartHeading}</h4>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <FilterButtons title={data.filter1} roundedLeft="xl" active={false} />
            <FilterButtons title={data.filter2} roundedRight="xl" active={false} />
          </div>

          <div className="flex flex-row gap-x-2">
            <ChartKey
              borderColor=""
              paddingH="px-3"
              paddingV=""
              texColor="csblack"
              title={data.key1}
              color={"csblue"}
            />
            <ChartKey
              borderColor=""
              paddingH="px-3"
              paddingV=""
              texColor="csblack"
              title={data.key2}
              color={"cspurple"}
            />
          </div>
        </div>
        <MyLineChart />
      </div>
    );
}

export default HomeChart;