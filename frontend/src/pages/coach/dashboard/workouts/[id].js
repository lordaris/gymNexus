import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Layout from "../../../components/coachLayout";
import Link from "next/link";
import { BsTrashFill } from "react-icons/bs";

function Workouts() {
  const [workout, setWorkout] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const token = Cookies.get("token");
  const router = useRouter();
  // const { id } = router.query;
  // The next const is the same as the one above, but it's destructured
  const {
    query: { id },
  } = router;

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
  const handleDeleteWorkout = () => {
    if (window.confirm("¿Está seguro de que desea eliminar esta rutina?")) {
      axios
        .delete(process.env.NEXT_PUBLIC_API_URL + `/workouts/delete/${id}`, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          alert("La rutina ha sido eliminada exitosamente.");
          router.push("/");
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDelete = (workoutId, dayId, exerciseId) => {
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      axios
        .delete(
          process.env.NEXT_PUBLIC_API_URL +
            `/workouts/delete/${workoutId}/${dayId}/${exerciseId}`,
          { headers: { Authorization: `${token}` } }
        )
        .then((response) => {
          alert("Exercise deleted successfully.");
          // Update the state of the workout to reflect the deletion
          setWorkout((prevState) => {
            const updatedDays = prevState.days.map((day) => {
              if (day._id === dayId) {
                const updatedExercises = day.exercises.filter(
                  (exercise) => exercise._id !== exerciseId
                );
                return { ...day, exercises: updatedExercises };
              }
              return day;
            });
            return { ...prevState, days: updatedDays };
          });
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDeleteDay = (workoutId, dayId) => {
    if (window.confirm("Are you sure you want to delete this day?")) {
      axios
        .delete(
          process.env.NEXT_PUBLIC_API_URL +
            `/workouts/delete/${workoutId}/${dayId}`,
          {
            headers: { Authorization: `${token}` },
          }
        )
        .then((response) => {
          alert("Day deleted successfully.");
          // Update the state of the workout to reflect the deletion
          setWorkout((prevState) => {
            const updatedDays = prevState.days.filter(
              (day) => day._id !== dayId
            );
            return { ...prevState, days: updatedDays };
          });
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <Layout>
      <div className="">
        <h1 className={"text-4xl font-thin font-lato"}>
          {workout.name}
          <button className="text-error" onClick={handleDeleteWorkout}>
            <BsTrashFill />
          </button>
        </h1>
        <ul>
          {workout.days.map((day) => (
            <li key={day._id} className="">
              <h2
                className={"text-4xl font-thin font-lato "}
                onClick={() => toggleDetails(day)}
              >
                {day.day} ({day.focus})
                <div className="">
                  <Link
                    href={`/coach/dashboard/workouts/new/exercise/${id}/${day._id}`}
                    className="btn"
                  >
                    Add exercise
                  </Link>
                  <button
                    onClick={() => handleDeleteDay(id, day._id)}
                    className={"btn btn-error m-4"}
                  >
                    Delete day
                  </button>
                </div>
              </h2>
              <div className={"divider"}></div>
              {selectedDay === day && (
                <ul className={""}>
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
                      <Link
                        href={`/coach/dashboard/workouts/update/${id}/${day._id}/${exercise._id}`}
                        className="btn m-4"
                      >
                        Edit
                      </Link>
                      <button
                        className={"btn btn-error"}
                        onClick={() => handleDelete(id, day._id, exercise._id)}
                      >
                        Delete
                      </button>
                      <div className={"divider"}></div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <Link
          href={`/coach/dashboard/workouts/new/day/${workout._id}`}
          className="btn btn-success m-4"
        >
          Add day
        </Link>
      </div>
    </Layout>
  );
}

export default Workouts;
