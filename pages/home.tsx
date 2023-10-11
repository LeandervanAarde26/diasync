import { useRouter } from "next/router";
import NavBar from "@/components/partial/NavBar";
import MyLineChart from "@/components/Common/Test";
import FilterButtons from "@/components/Common/FilterButtons.component";
import ChartKey from "@/components/Common/ChartKey";

function Home() {
  return (
    <div className="bg-gradient-to-br from-grad1 via-grad2 to-grad3 flex flex-col  h-screen w-[80%] p-5">
      <div className="flex flex-col h-[55vh] bg-cswhite rounded-2xl p-5 gap-y-[10px]">
        <div className="flex flex-row gap-x-[5px] items-center">
          <div className="w-[4px] h-[70%] bg-cspurple "></div>
          <h4 className="text-csblack">Bloodsugar level</h4>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <FilterButtons title="7 Days" roundedLeft="xl" active={false} />

            <FilterButtons title="24 Hours" roundedRight="xl" active={false} />
          </div>

          <div className="flex flex-row gap-x-2">
            <ChartKey title="This Month" color={"csblue"} />
            <ChartKey title="Last Month" color={"cspurple"} />
          </div>
        </div>
        <MyLineChart />
      </div>

      <div className="flex flex-row gap-x-[5px] h-[42vh] p-3">
      <div className="flex flex-col w-[35%] bg-gradient-to-t from-[#2C2C2C] via-[#0B0B0B] to-[#000000] rounded-3xl">

      </div>
      </div>
    </div>
  );
}

export default Home;
