import LoginRedirect from "../../components/loginRedirect";
import CoachLayout from "../../components/coachLayout";
export default function Dashboard() {
  LoginRedirect();
  return (
    <CoachLayout>
      <div className="flex justify-center">
        <h1 className="text-4xl m-4 font-thin font-lato">Coach Dashboard</h1>
      </div>
    </CoachLayout>
  );
}
