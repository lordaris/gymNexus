import Link from "next/link";
import LogoutButton from "./logoutButton";

export default function UserNavBar() {
  return (
    <div className="navbar bg-base-200">
      <Link href={"/user/dashboard"} className="flex-1">
        <h1 className="text-4xl px-10">
          <span className={"font-thin font-lato"}>gym</span>
          <span className="font-bebas-neue">NEXUS</span>
        </h1>
      </Link>
      <div className="flex-none font-bebas-neue">
        <ul className="menu menu-horizontal px-10 ">
          <li>
            <Link href={"/user/dashboard/routines"}>Workouts</Link>
          </li>
          <li>
            <Link href={"/user/dashboard/profile"}>Profile</Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </div>
  );
}
