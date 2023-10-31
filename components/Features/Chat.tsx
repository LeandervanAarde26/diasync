import BotResponse from "@/components/Common/BotResponse";
import HumanMessage from "@/components/Common/HumanMessage";
import { initialResponses } from "@/static/InitialResponses";
import { ChatType } from "@/types/ChatType";
import { MdSend, MdChatBubble } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { getRobotResponse } from "@/api/Calls";

function Chat(props: { observation: string }) {
  const randomNumber = Math.floor(Math.random() * 8);
  const [userMessage, setUserMessage] = useState<ChatType>();
  const messagesEndRef = useRef(null)
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
      const {value} = e.target;
      if(value !== '' || value !== null){
        setUserMessage({
          from: 'USER',
          response: value
        });
      }
  }

  const handleClick = async () => {
      setMessages((prev: any) => [...prev, userMessage]);
      setUserMessage({
        from: 'USER',
        response: ''
      });

    const getResponse = await getRobotResponse(userMessage?.response);

    if(getResponse?.status == 200){
      try {
        const newMessage : ChatType= {
          from: "BOT",
          response: getResponse.data,
        }
        setMessages((prev: any) => [...prev, newMessage]);
      } catch (error) {
        console.log(error)
      }
    }
  }


  useEffect(() => {
      console.log(messages)
  }, [])

  return (
    <div className=" w-[100%] h-[60vh] flex flex-col p-3 gap-x-4 bg-grad3 rounded-2xl p-4">
      <div className="flex flex-col w-[40%] mb-3">
      <h5>Chat and Observations</h5>
        <hr className="text-cswhite" />
      </div>

      <div className="flex flex-col w-[100%] h-[80%] p-3 overflow-scroll gap-y-5" ref={messagesEndRef}>
        {/* HIERSO */}
        {messages.map((i) => 
        i.from == "BOT"
        ?
        (
          <BotResponse response={i.response} />
        ) : (
          <HumanMessage response={i.response} />
        )
        )}
      </div>
      <div className="w-[100%] flex flex-row  h-[60px] border-cswhite border-2 rounded-full overflow-hidden items-center justify-center">
        <div className="w-[5%] h-[100%] flex justify-center items-center" >
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
          onChange={changeHandler}
        
        />

        <div className="w-[5%] h-[100%] bg-csblue flex justify-center items-center  hover:scale-110 cursor-pointer transition ease-in-out delay-150 duration-300" onClick={handleClick}>
          <MdSend key="Send icon" className="text-cswhite" fontSize={26} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
