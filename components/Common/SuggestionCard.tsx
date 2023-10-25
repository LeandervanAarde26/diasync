import Button from "./Button";
import Image, { StaticImageData } from "next/image";

type SuggestionCardType = {
  image: StaticImageData;
  url: string;
  content: string;
  foodName: string;
};

function SuggestionCard({ image, url, content, foodName }: SuggestionCardType) {
  return (
    <div className="w-[45%] h-[84%] bg-grad3 rounded-2xl p-4 flex flex-col justify-center gap-y-4">
      <div className="w-full h-[60px] flex flex-row items-center gap-x-4">
        <div className="w-[60px] h-[60px] bg-cspurple rounded-full  overflow-hidden flex object-center object-contain">
          <Image
            src={image}
            alt="Shapes"
            style={{ width: "100%" }}
            className="object-cover"
          />
        </div>

        <p id="foodName">{foodName}</p>
      </div>

      <p className="text-cswhite">{content}</p>
      <div className="flex flex-row w-1/1 h-fit justify-end">
        <a href={url} target="_blank">
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
