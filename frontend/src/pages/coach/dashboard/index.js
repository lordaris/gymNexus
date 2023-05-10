import LoginRedirect from "../../components/loginRedirect";
import CoachLayout from "../../components/coachLayout";
export default function Dashboard() {
  LoginRedirect();
  return (
    <CoachLayout>
      <div className={""}>
        <h1 className={"text-5xl font-thin font-lato"}>Coach Dashboard</h1>
      </div>
    </CoachLayout>
  );
}
