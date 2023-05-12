import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import Layout from "../../../components/coachLayout";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = Cookies.get("token");
      const coachId = Cookies.get("user");
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/users/list/${coachId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
      if (data && data.length > 0) {
        setUsers(data);
      } else {
        setUsers([]);
      }
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
