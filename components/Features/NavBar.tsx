import Image from "next/image";
import logo from "../../assets/icon.png";
import { MdHouse, MdReadMore, MdOutlinePoll, MdLogout } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
function NavBar() {
  const router = useRouter();

  const logout = () => {
    router.push("/");
  };

  return (
    <div className="h-screen border-r-[1px] border-cswhite w-[0vw] sm:w-[7vw] flex flex-col items-center p-5 justify-between gap-y-10 bg-gradient-to-br from-grad1 via-grad2 to-grad3 flex flex-col justify-center">
      <div>
        <Image src={logo} height={80} alt="Logo" />
      </div>

      <div className="flex flex-col gap-y-10 h-screen">
      <div
  className={`${
    router.pathname === "/home" || router.pathname === "/"
      ? "bg-csblue"
      : null
  } p-3 rounded-full`}
>
  <Link href="/home"> {/* Update the href */}
    <MdHouse key="person-icon" className="text-cswhite" fontSize={35} />
  </Link>
</div>

<div
  className={`${
    router.pathname === "/readings" ? "bg-csblue" : null
  } p-3 rounded-full`}
>
  <Link href="/readings"> {/* Update the href */}
    <MdReadMore
      key="person-icon"
      className="text-cswhite"
      fontSize={35}
    />
  </Link>
</div>

<div
  className={`${
    router.pathname === "/analyse" ? "bg-csblue" : null
  } p-3 rounded-full`}
>
  <Link href="/analyse"> {/* Update the href */}
    <MdOutlinePoll
      key="person-icon"
      className="text-cswhite"
      fontSize={35}
    />
  </Link>
</div>

      </div>

      <div className="" onClick={logout}>
        <MdLogout
          key="person-icon"
          className="hover:text-csDanger text-cswhite cursor-pointer"
          fontSize={35}
        />
      </div>
    </div>
  );
}

export default NavBar;
