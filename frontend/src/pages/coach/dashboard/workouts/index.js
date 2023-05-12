import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Link from "next/link";
import LogoutButton from "../../../components/logoutButton";
import Layout from "../../../components/coachLayout";

export default function RoutinesPage() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      const token = Cookies.get("token");
      const coachId = Cookies.get("user");
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/workouts/list/coach/${coachId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
      if (data && data.length > 0) {
        setRoutines(data);
      } else {
        setRoutines([]);
      }
    };
    fetchRoutines();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center">
        <h1 className="text-4xl m-4 font-thin font-lato">Workouts</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="table mx-auto">
          <tbody>
            {routines.map((workout) => (
              <tr key={workout._id} className={"hover"}>
                <td>
                  <div>
                    <div className="">
                      <Link href={`/coach/dashboard/workouts/${workout._id}`}>
                        {workout.name}
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
