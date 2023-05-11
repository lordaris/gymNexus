import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import LoginRedirect from "../components/loginRedirect";
import Link from "next/link";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  LoginRedirect();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3002/users/login", {
        email,
        password,
      });
      const token = response.data.token;
      Cookies.set("token", token); // Store token in cookie
      console.log(response.data);
      const role = response.data.role;
      Cookies.set("role", role); // Store role in cookie
      const user = response.data.id; // Store id in cookie
      Cookies.set("user", user);

      // Use the router to redirect to the appropriate dashboard
      if (role === "ATHLETE") {
        router.push("/user/dashboard");
      } else {
        router.push("/coach/dashboard");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center min-h-screen p-10 text-base-content bg-base-100 ">
      <div className="">
        <div>
          <h1 className={"font-thin font-lato text-4xl m-4"}>
            Login to your account{" "}
          </h1>
        </div>
        <form className="" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email{" "}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={"input input-ghost w-full max-w-xs m-4"}
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={"input input-ghost w-full max-w-xs m-4"}
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          {errorMessage && (
            <div className="mt-2 text-sm text-red-600">{errorMessage}</div>
          )}

          <div className={"flex justify-center"}>
            <button type="submit" className="btn btn-primary ">
              Login{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
