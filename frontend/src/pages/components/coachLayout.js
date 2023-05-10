import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import CoachNavBar from "./coachNavBar";

// TODO: Add a logout button
// TODO: Modify the navbar to be more responsive and with a better design
// TODO: Add a logo to the navbar

const CoachLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const securityCheck = () => {
    const role = Cookies.get("role");
    const router = useRouter();

    if (!role) {
      router.push("/");
    } else if (role !== "COACH") {
      router.push("/user/dashboard");
    }
  };

  return (
    <div className={"text-center"}>
      <CoachNavBar />
      <main className="">{children}</main>
    </div>
  );
};

export default CoachLayout;
