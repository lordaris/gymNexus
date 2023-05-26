import axios from "axios";
import { toast } from "react-toastify";

const handleDeleteExercise = (
  workoutId,
  dayId,
  exerciseId,
  setWorkout,
  token
) => {
  if (window.confirm("Are you sure you want to delete this exercise?")) {
    axios
      .delete(
        process.env.NEXT_PUBLIC_API_URL +
          `/workouts/delete/${workoutId}/${dayId}/${exerciseId}`,
        { headers: { Authorization: `${token}` } }
      )
      .then((response) => {
        toast.success("exercise deleted successfully", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }); // Update the state of the workout to reflect the deletion
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

export default handleDeleteExercise;
