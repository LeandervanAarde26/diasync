import Image from "next/image";
import icon from "../../assets/icon.png";
function Loader(props: {msg: string}) {
  return(
    <div className="flex flex-col items-center justify-center gap-y-5">
    <div className="rounded-md h-[60px] w-[60px] border-4 border-t-4 border-csblue animate-spin "></div>
    <p className="text-cswhite">{props.msg}</p>
  </div>
  );

}

export default Loader;
