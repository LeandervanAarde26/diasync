import Button from "./Button";
import Image, { StaticImageData } from "next/image";
import placeHolder from "../../assets/tester.png";

type SuggestionCardType = {
  link: string;
  description: string;
  heading: string;
};

function SuggestionCard({  link, description, heading }: SuggestionCardType) {
  return (
    <div className="w-[45%] h-[90%] bg-grad3 rounded-2xl p-4 flex flex-col justify-center gap-y-4">
      <div className="w-full h-[60px] flex flex-row items-center gap-x-4">
        {/* <div className=" max-h-[50px] min-h-[50px] aspect-[1/1] bg-cspurple rounded-full  overflow-hidden flex object-center object-contain">
          <Image
            src={placeHolder}
            alt="Shapes"
            style={{ width: "100%" }}
            className="object-cover"
          />
        </div> */}
        <p id="foodName">{heading}</p>
      </div>

      <p className="text-cswhite break-all line-clamp-3">{description}</p>
      <div className="flex flex-row w-1/1 h-fit justify-end">
        <a href={link} target="_blank">
          <Button
            label="Read more"
            type="secondary"
            clickHandler={() => console.log(null)}
          />
        </a>
      </div>
    </div>
  );
}

export default SuggestionCard;
