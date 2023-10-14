import Image from "next/image";
import Button from "./Button";
import data from '../../static/Dash.json';
import character from "../../assets/floating_character.png";
import { loginUser } from "@/api/Calls";

function LearnMore() {

    return (
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
            <p><b>{data.learnMore}</b></p>
            <Button
              label="Chat now"
              type="primary"
              clickHandler={() => {
                console.log("implement this");
              }}
            />
          </div>
        </div>
    );
}

export default LearnMore;