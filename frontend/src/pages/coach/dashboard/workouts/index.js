import { useState, useEffect } from "react";
import { getCoachRoutines } from "../../../api/getCoachRoutines";
import Link from "next/link";
import LogoutButton from "../../../components/logoutButton";
import Layout from "../../../components/coachLayout";
export default function RoutinesPage() {
  const [routines, setRoutines] = useState([]);
  useEffect(() => {
    const fetchRoutines = async () => {
      const routines = await getCoachRoutines();
      setRoutines(routines);
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
