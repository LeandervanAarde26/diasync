import Image from "next/image";
import shapes from "../../assets/Login&registerShapes.png";
import {
  MdFormatAlignRight,
  MdScale,
  MdChatBubbleOutline,
} from "react-icons/md";
import male from "../../assets/male.jpg";
import woman from "../../assets/woman.png";
import { UserContext } from "@/store/userContext.Context";
import { useContext, useState } from "react";
import { ReadingsContext } from "@/store/Readings.Context";
import { useRouter } from "next/router";
import ChatButton from "../Common/ChatButton";
import RightBarInformation from "../Common/RightBarInformation";

function RightContainer() {
  const { values } = useContext(UserContext);
  const router = useRouter();
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
    setFocus((prev) => !prev);
    console.log(focus);
  };

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
          <RightBarInformation
            heading={"Height"}
            icon={
              <MdFormatAlignRight
                key="person-icon"
                className="text-cspurple"
                fontSize={20}
              />
            }
            unit={"Cm"}
            information={values.height}
          />
          <RightBarInformation
            heading={"Weight"}
            icon={
              <MdScale
                key="person-icon"
                className="text-cspurple"
                fontSize={20}
              />
            }
            unit={"Kg"}
            information={values.weight}
          />
          <RightBarInformation
            heading={"Predicted HBA1C"}
            unit={"%"}
            information={estimatedHBA1c()}
          />
          <RightBarInformation
            heading={"Glucose tests"}
            unit={""}
            information={dat.length}
          />
          <RightBarInformation
            heading={"Average Glucose"}
            unit={""}
            information={averageBloodSugar.toFixed(1)}
          />
          <ChatButton />
        </div>
      </div>
    </div>
  );
}

export default RightContainer;
