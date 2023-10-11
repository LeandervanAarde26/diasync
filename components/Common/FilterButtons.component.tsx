import { FilterButtonTypes } from "@/types/FilterButtonTypes";

function FilterButtons({roundedLeft, roundedRight, active, title, clickHandler}: FilterButtonTypes) {
  return (
    <div className={`px-3 py-1 cursor-pointer border border-1 border-csblack rounded-r-${roundedRight} rounded-l-${roundedLeft} hover:border-2`}>
      <p>{title}</p>
    </div>
  );
}

export default FilterButtons;
