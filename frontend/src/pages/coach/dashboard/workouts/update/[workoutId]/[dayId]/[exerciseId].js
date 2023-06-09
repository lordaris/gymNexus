import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../../../components/ui/coachLayout";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

function ExerciseEditPage() {
  const [workout, setWorkout] = useState(null);
  const [exercise, setExercise] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    sets: "",
    reps: "",
    cadence: "",
    notes: "",
  });
  const router = useRouter();
  const token = Cookie.get("token");
  const { workoutId, dayId, exerciseId } = router.query;

  useEffect(() => {
    if (workoutId) {
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + `/workouts/list/${workoutId}`, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          const day = response.data.days.find((d) => d._id === dayId);
          const exercise = day.exercises.find((e) => e._id === exerciseId);
          setWorkout({ ...response.data, days: [day] });
          setExercise(exercise);
          setFormValues({
            name: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            cadence: exercise.cadence,
            notes: exercise.notes,
          });
        })
        .catch((error) => console.error(error));
    }
  }, [workoutId, dayId, exerciseId, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedExercise = { ...formValues };
    axios
      .put(
        process.env.NEXT_PUBLIC_API_URL +
          `/workouts/update/${workoutId}/${dayId}/${exerciseId}`,
        updatedExercise,
        { headers: { Authorization: `${token}` } }
      )
      .then(() => {
        toast.success("Exercise modified successfully", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push(`/coach/dashboard/workouts/${workoutId}`);
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  if (!workout || !exercise) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1 className={"font-thin font-lato text-4xl m-4"}>Edit Exercise</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Exercise</label>
          <input
            type="text"
            name="name"
            className={"input input-ghost w-full max-w-xs m-4"}
            value={formValues.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="sets">Sets</label>
          <input
            type="text"
            name="sets"
            className={"input input-ghost w-full max-w-xs m-4"}
            value={formValues.sets}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="reps">Reps</label>
          <input
            type="text"
            name="reps"
            className={"input input-ghost w-full max-w-xs m-4"}
            value={formValues.reps}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cadence">Cadence</label>
          <input
            type="text"
            name="cadence"
            className={"input input-ghost w-full max-w-xs m-4"}
            value={formValues.cadence}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <input
            type="text"
            name="notes"
            className={"input input-ghost w-full max-w-xs m-4"}
            value={formValues.notes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="video">Video</label>
          <input
            type="text"
            name="video"
            className={"input input-ghost w-full max-w-xs m-4"}
            value={formValues.video}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className={
            "btn btn-success hover:btn-success-accent hover:text-success-accent"
          }
        >
          Update Exercise
        </button>
      </form>
    </Layout>
  );
}

export default ExerciseEditPage;
