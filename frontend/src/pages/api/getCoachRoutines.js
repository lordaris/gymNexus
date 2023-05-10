import axios from "axios";
import Cookies from "js-cookie";

export const getCoachRoutines = async () => {
  const token = Cookies.get("token");
  const coachId = Cookies.get("user");
  const response = await axios.get(
    `http://localhost:3002/workouts/list/coach/${coachId}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  const data = response.data;
  console.log(data);
  if (data && data.length > 0) {
    return data;
  } else {
    return [];
  }
};
