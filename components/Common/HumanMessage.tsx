import Image from "next/image";
import logo from '../../assets/icon.png'

function HumanMessage(response:{response: string}) {
    return (
        <div className="flex flex-row w-[100%] gap-x-5 items-center justify-end ">
        <div className="max-w-[70%] bg-csGray p-3 rounded-3xl">
          <p>
          {response.response}
          </p>
        </div>

        <div className="flex flex-col w-[30px]">
          <Image src={logo} height={30} alt="Logo" />
        </div>
      </div>
    );
}

export default HumanMessage;