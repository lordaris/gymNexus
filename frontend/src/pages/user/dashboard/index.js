import Layout from "../../components/userLayout";
import Image from "next/image";

export default function UserDashboard() {
  return (
    <Layout>
      <div className="flex items-center flex-col">
        <h1 className="text-4xl m-4 font-thin font-lato">User Dashboard</h1>
        <Image
          src="/lunges.png"
          alt="empty-state"
          width={"500"}
          height={"500"}
          className={"opacity-50 p-4"}
        />
        <p className={"opacity-50 text-4xl"}>No data to display</p>
      </div>
    </Layout>
  );
}
