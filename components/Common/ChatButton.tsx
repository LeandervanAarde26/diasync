import { useRouter } from "next/router";
import { useState } from "react";
import { MdChatBubbleOutline } from "react-icons/md";

function ChatButton() {
  const [focus, setFocus] = useState<boolean>(false);
  const router = useRouter();
  const onHover = () => {
    setFocus((prev) => !prev);
    console.log(focus);
  };
  return (
    <div
      className="w-[60px] h-[60px] hover:w-[160px] hover:justify-start p-4 gap-x-3 bg-csblue rounded-full flex flex-center justify-center items-center cursor-pointer transition ease-in-out delay-150 duration-300  hover:bg-csDarkBlue rounded-full"
      onMouseEnter={onHover}
      onMouseLeave={onHover}
      onClick={() => {
        router.push("/analyse");
      }}
    >
      <MdChatBubbleOutline
        key="person-icon"
        className="text-cswhite"
        fontSize={35}
      />

      <p className={`${focus ? "flex" : "hidden"} text-cswhite`}>Let's chat</p>
    </div>
  );
}

export default ChatButton;
