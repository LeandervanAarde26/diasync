import Image from "next/image";
import logo from "../../assets/icon.png";
import male from "../../assets/male.jpg";
import woman from "../../assets/woman.png";

export default function HumanMessage(response: { response: string; gender: boolean }) {
  const profileImage = response.gender ? male : woman;
  return (
    <div className="flex flex-row w-[100%] gap-x-5 items-center justify-end ">
      <div className="max-w-[70%] bg-csGray p-3 rounded-3xl">
        <p>{response.response}</p>
      </div>

      <div className="flex flex-col w-[40px] rounded-full overflow-scroll">
        <Image src={profileImage} height={40} alt="profileImage" />
      </div>
    </div>
  );
}