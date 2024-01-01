import React, { useCallback, useEffect, useState } from "react";
import styles from "./AllAdmins.styles.module.css";
import AdminNavbar from "../Navbar/Navbar";
import axios from "axios";
import AllAdminRows from "./AllAdminsRows/AllAdminRows";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  createdAt: string;
}

const AllAdmins = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      image: "",
      createdAt: "",
    },
  ]);

  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get<User[]>("http://localhost:8000/getAllAdmins");
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <React.Fragment>
      <AdminNavbar />
      <table className={styles.mytable}>
        <thead>
          <tr className={styles.mytr}>
            <th className={styles.myth}>Image</th>
            <th className={styles.myth}>First Name</th>
            <th className={styles.myth}>Last Name</th>
            <th className={styles.myth}>Email</th>
            <th className={styles.myth}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <AllAdminRows
              serialNumber={user.id}
              firstName={user.firstName}
              email={user.email}
              lastName={user.lastName}
              createdAt={user.createdAt}
              image={user?.image}
              key={user.id}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};
export default AllAdmins;
