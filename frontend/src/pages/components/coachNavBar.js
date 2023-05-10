import Link from "next/link";
import LogoutButton from "./logoutButton";

export default function CoachNavBar() {
  return (
    <div className="navbar bg-base-200">
      <Link href={"/coach/dashboard"} className="flex-1">
        <h1 className="text-4xl px-10">
          <span className={"font-thin font-lato"}>gym</span>
          <span className="font-bebas-neue">NEXUS</span>
        </h1>
      </Link>
      <div className="flex-none font-bebas-neue">
        <ul className="menu menu-horizontal px-10 ">
          <li tabIndex={0}>
            <p>
              Workouts
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </p>
            <ul className="p-2 bg-base-200">
              <li>
                <Link href={"/coach/dashboard/workouts"}>List</Link>
              </li>
              <li>
                <Link href={"/coach/dashboard/workouts/new/workout"}>
                  Create
                </Link>
              </li>
            </ul>
          </li>

          <li tabIndex={0}>
            <p>
              Clients
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </p>
            <ul className="p-2 bg-base-200">
              <li>
                <Link href={"/coach/dashboard/users"}>List</Link>
              </li>
              <li>
                <Link href={"/coach/dashboard/users/createuser"}>Create</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href={"/coach/dashboard/profile"}>Profile</Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </div>
  );
}
