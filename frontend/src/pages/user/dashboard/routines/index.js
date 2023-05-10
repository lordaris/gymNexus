import { useState, useEffect } from "react";
import { getRoutines } from "../../../api/getRoutines";
import Link from "next/link";
import LogoutButton from "../../../components/logoutButton";
import Layout from "../../../components/userLayout";
import Cookies from "js-cookie";

// TODO Style workouts page

export default function RoutinesPage() {
  const [routines, setRoutines] = useState([]);
  useEffect(() => {
    const fetchRoutines = async () => {
      const routines = await getRoutines();
      setRoutines(routines);
      // TODO - Remove this console.log
      console.log(routines);
    };
    fetchRoutines();
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      // Use the router to redirect to the appropriate dashboard
      const role = Cookies.get("role");
      if (role !== "ATHLETE") {
        router.push("/coach/dashboard");
      }
    }
  }, []);

  return (
    <Layout>
      <div>
        <h1 className={"font-thin font-lato text-4xl"}>Workouts</h1>
        {routines.map((workout) => (
          <div key={workout._id}>
            <div>
              <Link href={`/user/dashboard/routines/${workout._id}`}>
                <span>{workout.name}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
