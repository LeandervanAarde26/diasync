import BotResponse from "@/components/Common/BotResponse";
import HumanMessage from "@/components/Common/HumanMessage";
import { initialResponses } from "@/static/InitialResponses";
import { MdSend, MdChatBubble } from "react-icons/md";

function Chat(props: { observation: string }) {
  const chatStructure = {
    response:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  };
  const randomNumber = Math.floor(Math.random() * 8);

  return (
    <div className=" w-[100%] h-[60vh] flex flex-col p-3 gap-x-4 bg-grad3 rounded-2xl p-4">
      <div className="flex flex-col w-[40%] mb-3">
        <h5>Chat and Observations</h5>
        <hr className="text-cswhite" />
      </div>

      <div className="flex flex-col w-[100%] h-[80%] p-3 overflow-scroll gap-y-5">
        <BotResponse response={initialResponses[randomNumber]} />
        <BotResponse response={`MY OBSERVATION: \n ${props.observation}`} />
        {Array(5)
          .fill(null)
          .map((_, index) =>
            index % 2 == 0 ? (
              <HumanMessage response={chatStructure.response} />
            ) : (
              <BotResponse response={chatStructure.response} />
            )
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
          <MdSend key="Send icon" className="text-cswhite" fontSize={26} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
