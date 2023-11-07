import Image from "next/image";
import data from "../../static/Auth.json";
import testImage from "../../assets/Diabet.png";
export default function AuthContainer() {
  return (
    <div className="hidden sm:flex md:h-screen w-[55%] gap-y-10 flex-col justify-center items-center bg-csblue">

      <div className="w-[80%]">
      <h2 className="text-white welcome-message">{data.heading}</h2>
        <p className="text-cswhite">{data.body}</p>
      </div>
      <Image src={testImage} height={550} alt="Floating character" />

    </div>
  );
}

