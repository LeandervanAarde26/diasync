import BotResponse from "@/components/Common/BotResponse";
import HumanMessage from "@/components/Common/HumanMessage";
import { initialResponses } from "@/static/InitialResponses";
import { ChatType } from "@/types/ChatType";
import { MdSend, MdChatBubble } from "react-icons/md";
import { useEffect, useState, useRef, useContext } from "react";
import { getRobotResponse } from "@/api/Calls";
import { UserContext } from "@/store/userContext.Context";

export default function Chat(props: { observation: string }) {
  const randomNumber = Math.floor(Math.random() * 8);
  const [userMessage, setUserMessage] = useState<ChatType>();
  const { values } = useContext(UserContext);
  const messagesEndRef = useRef<HTMLElement | null>(null);
  const [messages, setMessages] = useState<ChatType[]>([
    {
      from: "BOT",
      response: initialResponses[randomNumber],
    },
    {
      from: "BOT",
      response: `MY OBSERVATION: \n ${props.observation}`,
    },
  ]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value !== "" || value !== null) {
      setUserMessage({
        from: "USER",
        response: value,
      });
    }
  };

  const handleClick = async () => {
    if (userMessage?.response !== "" || userMessage !== null) {
      setMessages((prev: any) => [...prev, userMessage]);
      setUserMessage({
        from: "USER",
        response: "",
      });

      messagesEndRef!.current!.scrollIntoView({ behavior: "smooth" });
      const getResponse = await getRobotResponse(userMessage!.response);

      
      if (getResponse?.status == 200) {
        try {
      
          const newMessage: ChatType = {
            from: "BOT",
            response: JSON.parse(getResponse?.data),
          };
          setMessages((prev: any) => [...prev, newMessage]);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current = document.getElementById(
      "your-message-container-id"
    );
  }, []);

  return (
    <div className=" w-[100%] h-[60vh] flex flex-col p-3 gap-x-4 bg-grad3 rounded-2xl p-4">
      <div className="flex flex-col w-[40%] mb-3">
        <h5>Chat and Observations</h5>
        <hr className="text-cswhite" />
      </div>

      <div
        className="flex flex-col w-[100%] h-[80%] p-3 overflow-scroll gap-y-5"
        id="your-message-container-id"
      >
        {/* HIERSO */}
        {messages.map((i, index) =>
          i.from == "BOT" ? (
            <BotResponse key= {index} response={i.response} />
          ) : (
            <HumanMessage
              key= {index} 
              response={i.response}
              gender={values.sex == "Male" ? true : false}
            />
          )
        )}
      </div>
      <div className="flex flex-row gap-x-3">
        <div className="w-[100%] flex flex-row h-[60px] border-cswhite border-2 rounded-full overflow-hidden justify-start pl-3">
          <div className="w-[50px] h-[100%] flex justify-center items-center">
            <MdChatBubble
              key="Send icon"
              className="text-cswhite"
              fontSize={26}
            />
          </div>

          <input
            type="text"
            className="w-[90%] h-[100%]  bg-grad3  p-3 text-cswhite "
            placeholder="Type your message..."
            id="input"
            onChange={changeHandler}
            value={userMessage?.response}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
          />
        </div>

        <div
          className="w-[60px] h-[60px] bg-csblue flex justify-center items-center  hover:scale-110 cursor-pointer transition ease-in-out delay-150 duration-300 rounded-full items-center justify-center"
          onClick={handleClick}
        >
          <MdSend key="Send icon" className="text-cswhite" fontSize={26} />
        </div>
      </div>
    </div>
  );
}

