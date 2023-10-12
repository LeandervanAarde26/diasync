import { useRouter } from "next/router";
import NavBar from "@/components/partial/NavBar";
import MyLineChart from "@/components/Common/Test";
import FilterButtons from "@/components/Common/FilterButtons.component";
import ChartKey from "@/components/Common/ChartKey";
import Doughnuts from "@/components/Common/Doughnut";
import ComplicationsCard from "@/components/Common/ComplicationsCard.component";
import Image from "next/image";
import character from "../assets/floating_character.png";
import Button from "@/components/Button";
import tester from "../assets/glucosetester.png";
import data from '../static/Dash.json'
function Home() {
  return (
    <div className="bg-gradient-to-br from-grad1 via-grad2 to-grad3 flex flex-col  h-screen  w-[100%] sm:w-[80%] p-5">
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

      <div className="flex flex-row gap-x-[15px] h-[43vh] pt-3">
        <div className=" hidden md:flex flex-col w-[35%] bg-gradient-to-t from-[#252525] via-[#0B0B0B] to-[#000000] rounded-3xl">
          <div className="flex flex-row w-[100%] p-5 justify-between pl-7 items-center">
            <h5 className="text-cswhite">{data.bloodSugars}</h5>

            <div className="flex flex-col items-center">
              <h3>4%</h3>
              <p className="text-cswhite text-xs w-100%">Unstable bloodusgar</p>
            </div>
          </div>
          <div className="flex flex-col  h-[65%] items-center w-[100%]">
            <Doughnuts />
          </div>
        </div>

        <div className="flex flex-col w-[100%] md:w-[35%] gap-y-[10px] overflow-scroll">
          <h5>{data.unstableHeading}</h5>

          {/* Card container starts */}

          <ComplicationsCard
            heading="Heart Disease"
            body="Some sort of content is going to go here from the Ai that it will gene3rate based on your blood sugar and your blood sugars levels, its going to be freaking awesome dude, I tell you that much! anyway"
            url=" http://localhost:3000/home"
          />

          <ComplicationsCard
            heading="Heart Disease"
            body="Some sort of content is going to go here from the Ai that it will gene3rate based on your blood sugar and your blood sugars levels, its going to be freaking awesome dude, I tell you that much! anyway"
            url=" http://localhost:3000/home"
          />
          <ComplicationsCard
            heading="Heart Disease"
            body="Some sort of content is going to go here from the Ai that it will gene3rate based on your blood sugar and your blood sugars levels, its going to be freaking awesome dude, I tell you that much! anyway"
            url=" http://localhost:3000/home"
          />
          {/* Card container ends here */}
        </div>

        <div className="hidden sm:flex flex-col w-[100%] md:w-[28%] gap-y-[10px] overflow-scroll justify-center  items-center relative ">
          <div className="flex flex-col bg-cswhite w-[80%] h-[60%] rounded-2xl items-center gap-y-2 px-4">
            <div className="flex flex-col bg-cswhite w-[80%] h-[39%] rounded-2xl items-center ">
              <Image
                src={character}
                height={150}
                alt="Floating character"
                className="absolute top-[12px]"
              />
            </div>
            <p><b>Want to learn more about your Diabetes?</b></p>
            <Button
              label="Chat now"
              type="primary"
              clickHandler={() => {
                console.log("implement this");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
