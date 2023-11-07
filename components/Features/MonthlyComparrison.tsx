import Doughnuts from "../Common/Doughnut";

type MonthlyComparissonType = {
  month: string;
  year: number;
  low: number;
  stable: number;
  high: number;
  unstable: number;
};
export default  function MonthlyComparrison({
  month,
  year,
  low,
  stable,
  high,
  unstable,
}: MonthlyComparissonType) {
  return (
    <div className=" h-[100%] w-[50%] rounded-2xl bg-csGray overflow-hidden flex flex-row">
      <div className="h-[100%] w-[45%]  p-3">
        <div className="flex flex-col items-center justify-center h-full gap-y-3">
          <h5 className="text-csblack">
            <b>{month + " " + year}</b>{" "}
          </h5>
          <h5 className="text-csblack">{unstable} %</h5>
          <p>Unstable Blood glucose</p>
        </div>
      </div>

      <div className="h-[100%] w-[55%] p-3 flex flex-col justify-center items-center  p-14">
        <Doughnuts low={low} stable={stable} high={high} />
      </div>
    </div>
  );
}

