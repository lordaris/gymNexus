import axios from "axios";
import { toast } from "react-toastify";

const handleDeleteWorkout = (id, token, router) => {
  if (window.confirm("¿Está seguro de que desea eliminar esta rutina?")) {
    axios
      .delete(process.env.NEXT_PUBLIC_API_URL + `/workouts/delete/${id}`, {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        toast.success("Workout has been successfully deleted", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/coach/dashboard/workouts");
      })
      .catch((error) => console.error(error));
  }
};

export default handleDeleteWorkout;
