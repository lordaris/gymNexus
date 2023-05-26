import axios from "axios";
import { toast } from "react-toastify";
const handleDeleteDay = (workoutId, dayId, setWorkout, token) => {
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
        toast.success("Day deleted successfully", {
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
          const updatedDays = prevState.days.filter((day) => day._id !== dayId);
          return { ...prevState, days: updatedDays };
        });
      })
      .catch((error) => console.error(error));
  }
};

export default handleDeleteDay;
