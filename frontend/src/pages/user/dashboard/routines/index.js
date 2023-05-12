import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import Layout from "../../../components/userLayout";

export const getRoutines = async () => {
  const token = Cookies.get("token");
  const userId = Cookies.get("user");
  const response = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + `/workouts/list/assigned/${userId}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return response.data;
};

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
