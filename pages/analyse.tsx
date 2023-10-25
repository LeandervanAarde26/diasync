import { BloodSugarDoughnutType } from "@/components/Common/Doughnut";
import Scatters from "@/components/Common/Scatter";
import { BloodsugarType } from "@/types/BloodSugarType";
import { ReadingGroupType } from "@/types/ReadingGroupType";
import { useState, useEffect, useContext } from "react";
import { ReadingsContext } from "@/store/Readings.Context";
import { getMonthName } from "@/Reusables/Functions";
import ChartKey from "@/components/Common/ChartKey";
import Image from "next/image";
import placeHolder from "../assets/tester.png";
import logo from "../assets/icon.png";
import SuggestionCard from "@/components/Common/SuggestionCard";
import { MdSend, MdChatBubble } from "react-icons/md";
import BotResponse from "@/components/Common/BotResponse";
import HumanMessage from "@/components/Common/HumanMessage";

function Analyse() {
  const [groupedReadings, setGroupedReadings] = useState<
    Record<string, ReadingGroupType>
  >({});
  const [filter, setFilter] = useState<Record<string, ReadingGroupType>>({});
  const { dat } = useContext(ReadingsContext);
  const now = new Date();
  const currMonth = getMonthName(now);
  const prevMonth = getMonthName(
    new Date(now.getFullYear(), now.getMonth() - 1)
  );

  const fakeFoodContent = [
    {
      image: placeHolder,
      url: "http://localhost:3000",
      content:
        "This is content just to check the length of the article and so that I can do something here and so that thisd is readable and stuff so much fun",
      foodName: "Chicken Breasts",
    },
    {
      image: placeHolder,
      url: "http://localhost:3000",
      content:
        "This is content just to check the length of the article and so that I can do something here and so that thisd is readable and stuff so much fun",
      foodName: "Chicken Breasts",
    },
  ];

  const fakeArticles = [
    {
      image: placeHolder,
      url: "http://localhost:3000",
      content:
        "This is content just to check the length of the article and so that I can do something here and so that thisd is readable and stuff so much fun",
      title: "Chicken Breasts",
    },
    {
      image: placeHolder,
      url: "http://localhost:3000",
      content:
        "This is content just to check the length of the article and so that I can do something here and so that thisd is readable and stuff so much fun",
      title: "Chicken Breasts",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-grad1 via-grad2 to-grad3 flex flex-col h-[110vh] sm:h-screen w-[100%] sm:w-[80%]  ">
      <div className="w-fill h-[100vh] p-5 overflow-scroll">
        <div className="w-[100%]">
          <div className=" w-[100%] h-[43vh] flex flex-row p-3 gap-x-4">
            <div className=" h-[100%] w-[50%] rounded-2xl bg-csGray overflow-hidden flex flex-row">
              <div className="h-[100%] w-[45%] p-3">
                <h4 className="text-csblack">{prevMonth}: </h4>
                <div className="flex flex-col items-center justify-center h-full gap-y-3">
                  <h5 className="text-csblack">7%</h5>
                  <p>unstable BloodSugar</p>
                  <ChartKey
                    borderColor="csGray"
                    paddingH="px-3"
                    paddingV=""
                    texColor="csblack"
                    title={"High"}
                    color={"csDanger"}
                  />
                  <ChartKey
                    borderColor="csGray"
                    paddingH="px-3"
                    paddingV=""
                    texColor="csblack"
                    title={"Stable"}
                    color={"csgreen"}
                  />

                  <ChartKey
                    borderColor="csGray"
                    paddingH="px-3"
                    paddingV=""
                    texColor="csblack"
                    title={"Low"}
                    color={"csyellow"}
                  />
                </div>
              </div>
            </div>

            <div className=" h-[100%] w-[50%] rounded-2xl bg-csGray overflow-hidden flex flex-row">
              <div className="h-[100%] w-[45%]  p-3">
                <h4 className="text-csblack">{currMonth}: </h4>
                <div className="flex flex-col items-center justify-center h-full gap-y-3">
                  <h5 className="text-csblack">7%</h5>
                  <p>unstable BloodSugar</p>
                  <ChartKey
                    borderColor="csGray"
                    paddingH="px-3"
                    paddingV=""
                    texColor="csblack"
                    title={"High"}
                    color={"csDanger"}
                  />
                  <ChartKey
                    borderColor="csGray"
                    paddingH="px-3"
                    paddingV=""
                    texColor="csblack"
                    title={"Stable"}
                    color={"csgreen"}
                  />

                  <ChartKey
                    borderColor="csGray"
                    paddingH="px-3"
                    paddingV=""
                    texColor="csblack"
                    title={"Low"}
                    color={"csyellow"}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" w-[100%] h-[43vh] flex flex-row p-3 gap-x-4 ">
            <div className=" h-[100%] w-[50%] overflow-hidden flex flex-col">
              <h5 id="adjustments" className="mb-3">
                Dietary adjustments based on your glucose trends
              </h5>
              <div className="w-[100%] h-[100%] flex flex-row gap-x-5">
                {fakeArticles.map((i) => (
                  <SuggestionCard {...i} foodName={i.title} />
                ))}
              </div>
            </div>

            <div className=" h-[100%] w-[50%] overflow-hidden flex flex-col">
              <h5 id="adjustments" className="mb-3 md:ml-[50px]">
                Dietary adjustments based on your glucose trends
              </h5>
              <div className="w-[100%] h-[100%] flex flex-row gap-x-5 justify-end">
                {fakeFoodContent.map((i) => (
                  <SuggestionCard {...i} />
                ))}
              </div>
            </div>
          </div>

          <div className=" w-[100%] h-[60vh] flex flex-col p-3 gap-x-4 bg-grad3 rounded-2xl p-4">
            <div className="flex flex-col w-[40%] mb-3">
              <h5>Chat and Observations</h5>
              <hr className="text-cswhite" />
            </div>

            <div className="flex flex-col w-[100%] h-[80%] p-3 overflow-scroll gap-y-5">
              {Array(5)
                .fill(null)
                .map((_, index) =>
                  index % 2 == 0 ? <BotResponse /> : <HumanMessage />
                )}
            </div>
            <div className="w-[100%] flex flex-row  h-[60px] border-cswhite border-2 rounded-full overflow-hidden items-center justify-center">
              <div className="w-[5%] h-[100%] flex justify-center items-center">
                <MdChatBubble
                  key="Send icon"
                  className="text-cswhite"
                  fontSize={26}
                />
              </div>

              <input
                type="text"
                className="w-[90%] h-[100%]  bg-grad3  p-3 text-cswhite"
                placeholder="Type your message..."
              />

              <div className="w-[5%] h-[100%] bg-csblue flex justify-center items-center  hover:scale-110 cursor-pointer transition ease-in-out delay-150 duration-300">
                <MdSend
                  key="Send icon"
                  className="text-cswhite"
                  fontSize={26}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analyse;
