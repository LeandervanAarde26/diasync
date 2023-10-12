import Image from "next/image";
import notFoundImage from "../assets/floating_character.png";
import Button from "@/components/Common/Button";

function NotFound() {
  return (
    <div className="bg-gradient-to-br from-grad1  via-grad2  to-grad3 flex flex-col justify-center items-center  h-screen gap-y-8 w-screen">
      <div className="flex items-center flex-col justify-center gap-y-2">

        <Image src={notFoundImage} alt="Floating Character" />

        <h1>404</h1>

        <h3>Oops... something went wrong</h3>
        <h5>Please return back to the home page</h5>
      </div>

      {/* /Insert the button here */}
      <Button
        label="Home"
        disabled={true}
        clickHandler={() => console.log("hey")}
        type="primary"
      />
    </div>
  );
}

export default NotFound;
