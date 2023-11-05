import Image from "next/image";
import notFoundImage from "@/assets/Diabet.png";
import Button from "@/components/Common/Button";
import data from "@/static/404.json";

export default function NotFound() {
  return (
    <div className="bg-csblue flex flex-col md:flex-row justify-center items-center  h-screen gap-8 w-screen">
      <div className="flex items-center flex-col md:flex-row  justify-center gap-y-2">
        <Image src={notFoundImage} alt="Floating Character" height={600} />

        <div className="flex flex-col justify-center items-center gap-y-3">
          <h1 className="text-5xl text-center text-grad3">
            <b>{data.Title}</b>
          </h1>

          <h3 className="text-3xl text-center">{data.Subheading}</h3>
          <h5 className="text-2xl text-center">{data.Content}</h5>
          <Button
            label="Take me Home"
            disabled={true}
            clickHandler={() => console.log("hey")}
            type="tertiary"
          />
        </div>
      </div>
    </div>
  );
}

