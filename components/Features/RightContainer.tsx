import Image from "next/image";
import shapes from "../../assets/Login&registerShapes.png";
import {
  MdFormatAlignRight,
  MdScale,
  MdChatBubbleOutline,
} from "react-icons/md";
import image from "../../assets/tester.png";
import male from "../../assets/male.jpg";
import woman from "../../assets/woman.png";
import { UserContext } from "@/store/userContext.Context";
import { useContext, useState } from "react";
import { ReadingsContext } from "@/store/Readings.Context";
import { useRouter } from "next/router";

function RightContainer() {
  const { values } = useContext(UserContext);
  const router =  useRouter();
  const { dat } = useContext(ReadingsContext);
  const averageBloodSugar = dat.reduce((accumulator, curr) => {
    const bloodSugarLevel = parseInt(curr.blood_sugar_level);
    return accumulator + bloodSugarLevel / dat.length;
  }, 0);
  const estimatedHBA1c = () => {
    const estimated = (averageBloodSugar + 2.59) / 1.59;
    return estimated.toFixed(1);
  };

  const [focus, setFocus] = useState<boolean>(false);

  const onHover = () => {
    setFocus(prev => !prev);
    console.log(focus);
  }

  return (
    <div className=" hidden w-[18%] static  h-fill sm:flex flex-col items-center p-3 gap-y-5 bg-gradient-to-br from-grad2 to-grad3 flex flex-col justify-center">
      <div className="bg-cswhite w-[100%] relative  h-[32%] rounded-2xl overflow-hidden flex flex-col items-center ">
        <div className="h-[40%] w-[100%] bg-cslightpurple ">
          <Image
            src={shapes}
            alt="Shapes"
            style={{ width: "100%" }}
            className="rotate-180"
          />
        </div>

        <div className="w-[100px] h-[100px] bg-cspurple rounded-full absolute top-[20%] overflow-hidden flex object-center object-contain ">
          <Image
            src={values.sex == "Male" ? male : woman}
            alt="Shapes"
            style={{ width: "100%" }}
            className="object-cover"
          />
        </div>

        <p className="relative top-12  z-10">
          <b>{values.name}</b>
        </p>
        <p className="relative top-11  z-10">{values.type}</p>
        <p className="relative top-11  z-10">{values.email}</p>
      </div>

      <div className="bg-cswhite w-[100%] h-[65%] rounded-2xl overflow-hidden p-5">
        <h5 className="text-csblack text-xl font-semibold text-center mb-4">
          About {values.name}
        </h5>
        <div className="w-full flex flex-col items-center gap-y-3">
          <div className="h-[60px]">
            <div className="flex flex-row items-center justify-center ">
              <MdFormatAlignRight
                key="person-icon"
                className="text-cspurple"
                fontSize={20}
              />
              <span className="text-csblack text-lg">Height</span>
            </div>
            <span className="text-csblue text-lg">
              <b>{values.height}cm</b>
            </span>
          </div>

          <div className="h-[60px]">
            <div className="flex flex-row items-center justify-center ">
              <MdScale
                key="person-icon"
                className="text-cspurple"
                fontSize={20}
              />
              <span className="text-csblack text-lg">Weight</span>
            </div>
            <span className="text-csblue text-lg">
              <b>{values.weight}Kg</b>
            </span>
          </div>

          <div className="h-[60px]">
            <div className="flex flex-col items-center justify-center">
              <span className="text-csblack text-lg">Predicted HBA1C</span>
              <span className="text-csblue text-lg">
                <b>{estimatedHBA1c() + "%"}</b>
              </span>
            </div>
          </div>

          <div className="h-[60px]">
            <div className="flex flex-col items-center justify-center">
              <span className="text-csblack text-lg">Glucose tests </span>
              <span className="text-csblue text-lg">
                <b>{dat.length}</b>
              </span>
            </div>
          </div>

          <div className="h-[60px]">
            <div className="flex flex-col items-center justify-center">
              <span className="text-csblack text-lg">Average Glucose</span>
              <span className="text-csblue text-lg">
                <b>{averageBloodSugar.toFixed(1)}</b>
              </span>
            </div>
          </div>

          <div className="w-[60px] h-[60px] hover:w-[160px] hover:justify-start p-4 gap-x-3 bg-csblue rounded-full flex flex-center justify-center items-center cursor-pointer " onMouseEnter={onHover} onMouseLeave={onHover} onClick={() => {router.push('/analyse')}}>

            <MdChatBubbleOutline
              key="person-icon"
              className="text-cswhite"
              fontSize={35}
            />

            <p className={`${focus ? 'flex' : 'hidden'} text-cswhite`}>Let's chat</p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default RightContainer;
