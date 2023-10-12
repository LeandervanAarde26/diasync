import Image from "next/image";
import shapes from "../../assets/Login&registerShapes.png";
import { MdFormatAlignRight, MdScale } from "react-icons/md";
import image from "../../assets/tester.png";

function RightContainer() {
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

        <div className="w-[120px] h-[120px] bg-cspurple rounded-full absolute top-[20%] overflow-hidden flex object-center object-contain ">
          <Image
            src={image}
            alt="Shapes"
            style={{ width: "100%" }}
            className="object-cover"
          />
        </div>

        <p className="relative top-20  z-10">Leander van Aarde</p>
      </div>

      <div className="bg-cswhite w-[100%] h-[65%] rounded-2xl overflow-hidden p-5">
        <h5 className="text-csblack">This Month</h5>
        <div className="w-full flex flex-col items-center">
          <div className="p-5">
            <div className="flex flex-row items-center justify-center ">
              <MdFormatAlignRight
                key="person-icon"
                className="text-cspurple"
                fontSize={27}
              />
              <span className="text-csblack text-lg">Height</span>
            </div>
            <span className="text-csblue text-2xl">
              <b>150cm</b>
            </span>
          </div>

          <div className="p-3">
            <div className="flex flex-row items-center justify-center ">
              <MdScale
                key="person-icon"
                className="text-cspurple"
                fontSize={27}
              />
              <span className="text-csblack text-lg">Weight</span>
            </div>
            <span className="text-csblue text-2xl">
              <b>150cm</b>
            </span>
          </div>

          <div className="p-5">
            <div className="flex flex-col items-center justify-center">
              <span className="text-csblack text-lg">Predicted HBA1C</span>
              <span className="text-csblue text-xl">
                <b>150cm</b>
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="flex flex-col items-center justify-center">
              <span className="text-csblack text-lg">Glucose tests </span>
              <span className="text-csblue text-xl">
                <b>150cm</b>
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="flex flex-col items-center justify-center">
              <span className="text-csblack text-lg">Average Glucose</span>
              <span className="text-csblue text-xl">
                <b>150cm</b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightContainer;
