import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import CoachLayout from "../../../../components/coachLayout";

// TODO Add a confirmation dialog before creating the user
// TODO Clean up the input fields after creating the user
// TODO Clean the code

export default function SignupPage() {
  const id = Cookies.get("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ATHLETE");
  const [errorMessage, setErrorMessage] = useState("");
  const addedBy = id;
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3002/users/signup", {
        email,
        password,
        role,
        addedBy,
      });
      alert("User created successfully");
      const token = response.data.token;
      await router.push("/coach/dashboard/users");
    } catch (error) {
      if (error.response.data.message === "User already exists") {
        alert(error.response.data.message);
      } else {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <CoachLayout>
      <div className="">
        <div className="">
          <div>
            <h2 className="text-4xl m-4 font-thin font-lato">
              Create a new user
            </h2>
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
            </div>

            <div>
              <button type="submit" className="btn-success btn m-4">
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </CoachLayout>
  );
}
