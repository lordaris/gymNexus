import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookie from "js-cookie";
import Layout from "../../../../../components/coachLayout";

export default function NewDayForm() {
  const [formValues, setFormValues] = useState({
    day: "",
    focus: "",
  });
  const router = useRouter();
  const token = Cookie.get("token");
  const { workoutId } = router.query;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDay = { ...formValues };
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + `/workouts/add/${workoutId}`,
        newDay,
        {
          headers: { Authorization: `${token}` },
        }
      )
      .then(() => {
        alert("Day added!");
        router.push(`/coach/dashboard/workouts/${workoutId}`);
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Layout>
      <h1 className="text-4xl m-4">
        <span className={"font-thin font-lato"}>Add new day</span>
      </h1>{" "}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="day"
            className={"input input-ghost w-full max-w-xs"}
            placeholder="Day"
            value={formValues.day}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="focus"
            className={"input input-ghost w-full max-w-xs"}
            placeholder="Focus"
            value={formValues.focus}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={"btn bg-success m-4"}>
          Add Day
        </button>
      </form>
    </Layout>
  );
}
