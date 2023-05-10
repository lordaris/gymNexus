import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token"); // Remove token from cookie
    Cookies.remove("role"); // Remove role from cookie
    Cookies.remove("user"); // Remove user from cookie
    router.push("/"); // Redirect to home page
  };

  return (
    <>
      <a href="#logout" className="text-error">
        Logout{" "}
      </a>
      <div className="modal" id="logout">
        <div className="modal-box">
          <h3 className="font-bold text-lg">You are logging out </h3>
          <p className="py-4">Are you sure you want to log out?</p>
          <div className="modal-action">
            <button onClick={handleLogout} className="btn">
              Yes
            </button>
            <a href={"#"} className={"btn bg-success"} htmlFor={"logout"}>
              No
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
