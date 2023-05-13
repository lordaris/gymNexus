import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import LoginRedirect from "../../components/loginRedirect";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("COACH");
  const [errorMessage, setErrorMessage] = useState("");

  LoginRedirect();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/users/signup",
        {
          email,
          password,
          role,
        }
      );
      alert("User created successfully");
      router.push("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen flex flex-col h-full items-center justify-center p-10 text-base-content bg-base-100">
      <div className="">
        <div>
          <h1 className="text-4xl m-4 font-lato ">
            Create an account, it is free!
          </h1>
        </div>
        <form className="" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address{" "}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required={true}
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
                required={true}
                className={"input input-ghost w-full max-w-xs m-4"}
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="role" className="sr-only">
                Rol
              </label>
            </div>
            <div className={"flex justify-center"}>
              <button
                type="submit"
                className="btn btn-primary flex justify-center"
              >
                Create account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
