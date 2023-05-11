import { getCoachUsers } from "../../../api/getCoachUsers";
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../../components/coachLayout";

// TODO - Add a link to create a new user, and a link to edit each user

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getCoachUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div>
        <h1 className="text-4xl m-4 font-thin font-lato">Users </h1>
        <div className="overflow-x-auto ">
          <table className="table mx-auto">
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className={"hover"}>
                  <td>
                    <div>
                      <Link href={`/coach/dashboard/users/${user._id}`}>
                        {user.email}
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
