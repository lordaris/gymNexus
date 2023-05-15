import LoginRedirect from "../../components/loginRedirect";
import CoachLayout from "../../components/coachLayout";
import Image from "next/image";
export default function Dashboard() {
  LoginRedirect();
  return (
    <CoachLayout>
      <div className="flex items-center flex-col">
        <h1 className="text-4xl m-4 font-thin font-lato">Coach Dashboard</h1>
        <Image
          src="/lunges.png"
          alt="empty-state"
          width={"500"}
          height={"500"}
          className={"opacity-50 p-4"}
        />
        <p className={"opacity-50 text-4xl"}>No data to display</p>
      </div>
    </CoachLayout>
  );
}
