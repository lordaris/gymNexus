import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Layout from "../../../components/userLayout";
import Link from "next/link";

function UserDashboard() {
  const [workout, setWorkout] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const token = Cookies.get("token");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3002/workouts/list/${id}`, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => setWorkout(response.data))
        .catch((error) => console.error(error));
    }
  }, [id, token]);
  if (!workout) {
    return <div>Loading...</div>;
  }

  const toggleDetails = (day) => {
    if (selectedDay === day) {
      setSelectedDay(null);
    } else {
      setSelectedDay(day);
    }
  };

  return (
    <Layout>
      <div className="">
        <h1 className="text-4xl font-thin font-lato">{workout.name} </h1>

        <ul>
          {workout.days.map((day) => (
            <li key={day._id}>
              <h2
                className={"text-4xl font-thin font-lato "}
                onClick={() => toggleDetails(day)}
              >
                {day.day} ({day.focus})
              </h2>

              {selectedDay === day && (
                <ul>
                  {day.exercises.map((exercise) => (
                    <li key={exercise._id} className="text-3xl font-bebas-neue">
                      <h3 className="text-4xl ">{exercise.name}</h3>
                      <p>
                        <span className={"font-semibold"}>Sets:</span>{" "}
                        {exercise.sets}
                      </p>
                      <p>
                        <span className={"font-semibold"}>Reps: </span>
                        {exercise.reps}
                      </p>
                      <p>
                        <span className={"font-semibold"}>Cadence:</span>{" "}
                        {exercise.cadence}
                      </p>
                      <p>
                        <span className={"font-semibold"}>Notes: </span>
                        {exercise.notes}
                      </p>
                      <div className={"divider"}></div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default UserDashboard;
