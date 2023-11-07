import { FilterButtonTypes } from "@/types/FilterButtonTypes";

export default function FilterButtons({roundedLeft, roundedRight, active, title, clickHandler}: FilterButtonTypes) {
  return (
    <div className={`px-3 py-1 bg-cswhite cursor-pointer border border-1 border-csblack rounded-r-${roundedRight} rounded-l-${roundedLeft} hover:border-2`} onClick={clickHandler}>
      <p>{title}</p>
    </div>
  );
}
