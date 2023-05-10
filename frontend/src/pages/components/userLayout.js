import { useState } from "react";
import UserNavBar from "./userNavBar";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

// TODO: Add a logout button
// TODO: Modify the navbar to be more responsive and with a better design
// TODO: Add a logo to the navbar

const UserLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const role = Cookies.get("role");
  const router = useRouter();

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
    <div className="text-center">
      <UserNavBar />
      <main>{children}</main>
    </div>
  );
};

export default UserLayout;
