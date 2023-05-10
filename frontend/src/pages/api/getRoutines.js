import axios from "axios";
import Cookies from "js-cookie";

export const getRoutines = async () => {
  const token = Cookies.get("token");
  const userId = Cookies.get("user");
  const response = await axios.get(
    `http://localhost:3002/workouts/list/assigned/${userId}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return response.data;
};
