import Image from "next/image";
import shapes from "../../assets/Login&registerShapes.png";
import character from "../../assets/floating_character.png";
import data from "../../static/Auth.json";

function AuthContainer() {
  return (
    <div className="hidden sm:flex md:h-screen w-[55%] flex-col justify-between items-center">
      <Image src={character} height={250} alt="Floating character" />
      <div className="w-[80%]">
        <h2 className="text-cspurple welcome-message">{data.heading}</h2>
        <p>{data.body}</p>
      </div>
      <Image src={shapes} alt="Shapes" style={{ width: "100%" }} />
    </div>
  );
}

export default AuthContainer;
