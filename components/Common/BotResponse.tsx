import Image from "next/image";
import logo from '../../assets/icon.png'
function BotResponse() {
    return (
        <div className="flex flex-row w-[100%] gap-x-5  items-center ">
        <div className="flex flex-col w-[30px]">
          <Image src={logo} height={30} alt="Logo" />
        </div>

        <div className="max-w-[70%] bg-grad1 p-3 rounded-3xl">
          <p className="text-cswhite">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
    );
}

export default BotResponse;