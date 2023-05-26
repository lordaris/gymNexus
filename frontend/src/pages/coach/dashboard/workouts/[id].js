import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Layout from "../../../components/ui/coachLayout";
import Link from "next/link";
import { BsTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import handleDeleteDay from "../../../components/handleDeleteDay";
import handleDeleteExercise from "../../../components/handleDeleteExercise";
import handleDeleteWorkout from "../../../components/handleDeleteWorkout";

function Workouts() {
  const [workout, setWorkout] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const token = Cookies.get("token");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + `/workouts/list/${id}`, {
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
        <h1 className="text-4xl font-thin font-lato">
          {workout.name}
          <button
            className="text-error"
            onClick={() => handleDeleteWorkout(id, token, router)}
          >
            <BsTrashFill />
          </button>
        </h1>

        <ul>
          {workout.days.map((day) => (
            <li key={day._id} className="">
              <h2
                className="text-4xl font-thin font-lato cursor-pointer"
                onClick={() => toggleDetails(day)}
              >
                <div className="flex justify-center py-4 items-center">
                  {day.day} ({day.focus}){" "}
                  <button
                    onClick={() =>
                      handleDeleteDay(id, day._id, setWorkout, token)
                    }
                    className=" text-error px-4 py-2"
                  >
                    <BsTrashFill />{" "}
                  </button>
                </div>
                <div>
                  <Link
                    href={`/coach/dashboard/workouts/new/exercise/${id}/${day._id}`}
                    className="btn text-success px-4 py-2"
                  >
                    New Exercise{" "}
                  </Link>
                </div>
              </h2>
              <div className="divider"></div>

              {selectedDay === day && (
                <ul className="">
                  {day.exercises.map((exercise) => (
                    <li key={exercise._id} className="text-xl font-lato">
                      {" "}
                      <h3 className="text-3xl font-bebas-neue">
                        {exercise.video ? (
                          <a
                            href={exercise.video}
                            className="text-primary hover:text-primary-dark"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {exercise.name}
                          </a>
                        ) : (
                          <span>{exercise.name}</span>
                        )}
                      </h3>
                      <div className={"flex justify-center items-center"}>
                        <Link
                          href={`/coach/dashboard/workouts/update/${id}/${day._id}/${exercise._id}`}
                          className="text-success px-4 py-2 mr-4"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() =>
                            handleDeleteExercise(
                              id,
                              day._id,
                              exercise._id,
                              setWorkout,
                              token
                            )
                          }
                          className="text-error px-4 py-2"
                        >
                          <BsTrashFill />
                        </button>
                      </div>
                      <p className="text-lg font-lato">
                        <span className="font-semibold">Sets:</span>{" "}
                        {exercise.sets}
                      </p>
                      <p className="text-lg font-lato">
                        <span className="font-semibold">Reps:</span>{" "}
                        {exercise.reps}
                      </p>
                      <p className="text-lg font-lato">
                        <span className="font-semibold">Cadence:</span>{" "}
                        {exercise.cadence}
                      </p>
                      {exercise.notes && exercise.notes.trim().length > 0 && (
                        <p className="text-lg font-lato">
                          <span className="font-semibold">Notes:</span>{" "}
                          {exercise.notes}
                        </p>
                      )}
                      <div className="divider"></div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <Link
          href={`/coach/dashboard/workouts/new/day/${workout._id}`}
          className="btn bg-success text-white rounded-md px-4 py-2 mt-8"
        >
          Add day
        </Link>
      </div>
    </Layout>
  );
}

export default Workouts;
