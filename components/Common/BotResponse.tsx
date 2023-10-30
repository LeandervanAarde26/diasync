import Image from "next/image";
import logo from '../../assets/icon.png'
function BotResponse(response: {response: string}) {
    return (
        <div className="flex flex-row w-[100%] gap-x-5  items-center ">
        <div className="flex flex-col w-[30px]">
          <Image src={logo} height={30} alt="Logo" />
        </div>

        <div className="max-w-[70%] bg-grad1 p-3 rounded-3xl">
          <p className="text-cswhite">
                {response.response}
          </p>
        </div>
      </div>
    );
}

export default BotResponse;