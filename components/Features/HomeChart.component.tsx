import FilterButtons from "../Common/FilterButtons.component";
import data from "../../static/Dash.json";
import ChartKey from "../Common/ChartKey";
import MyLineChart, { BloodsugarType } from "../Common/Test";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/store/userContext.Context";
import { getUserReadings } from "@/api/Calls";

function HomeChart() {
  const { values, setValues } = useContext(UserContext);
  const [show, setShow] = useState<boolean>(true);

  // useEffect(() => {
  //   const fetchUserReadings = async () => {
  //     const userData = await getUserReadings(values.id);

  //     if (userData && userData.status === 200) {
  //       try {
  //         console.log("HEYY", userData);
  //         setShow(true);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }

  //   fetchUserReadings();
  // }, [values.id]);

  const props: BloodsugarType[] = [
    {
      time: "2023-10-15",
      blood_sugar_level: "17.6",
    },
    {
      time: "2023-10-15",
      blood_sugar_level: "17.6",
    },
    {
      time: "2023-10-15",
      blood_sugar_level: "17.6",
    },
  ];

  return (
    <div className="flex flex-col h-[55vh] bg-cswhite rounded-2xl p-5 gap-y-[10px]">
      <div className="flex flex-row gap-x-[5px] items-center">
        <div className="w-[4px] h-[70%] bg-cspurple "></div>
        <h4 className="text-csblack">{data.chartHeading}</h4>
      </div>
      <div className="hidden sm:flex flex-row justify-between">
        <div className="flex flex-row">
          <FilterButtons title={data.filter1} roundedLeft="xl" active={false} />
          <FilterButtons
            title={data.filter2}
            roundedRight="xl"
            active={false}
          />
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
      {show ? (
      <MyLineChart data={props} />
    ) : (
      <div>Loading...</div>
    )}
    </div>
  );
}

export default HomeChart;
