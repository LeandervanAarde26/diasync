import { useRouter } from "next/router";
import ComplicationsCard from "@/components/Common/ComplicationsCard.component";
import Image from "next/image";

import Button from "@/components/Common/Button";
import data from "../static/Dash.json";
import HomeChart from "@/components/Features/HomeChart.component";
import HomeDoughnutChart from "@/components/Features/HomeDoughnutChart.component";
import LearnMore from "@/components/Common/LearnMore.component";

function Home() {
  return (
    <div className="bg-gradient-to-br from-grad1 via-grad2 to-grad3 flex flex-col  h-screen  w-[100%] sm:w-[80%] p-5">
      <HomeChart />

      <div className="flex flex-row gap-x-[15px] h-[43vh] pt-3">
        <HomeDoughnutChart />

        <div className="flex flex-col w-[100%] md:w-[35%] gap-y-[10px] overflow-scroll">
          <h5>{data.unstableHeading}</h5>

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
        </div>

        <LearnMore />
      </div>
    </div>
  );
}

export default Home;
