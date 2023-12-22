import React, { useCallback, useEffect, useState } from "react";
import styles from "./AllUsers.styles.module.css";
import AdminNavbar from "../Navbar/Navbar";
import Rows from "./Rows/Rows";
import axios from "axios";
import Modal from "./Modal/Modal";
import Swal from "sweetalert2";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  image: string;
  updatedAt: string;
}

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      image: "",
      updatedAt: "",
    },
  ]);
  const [user, setUser] = useState<User | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get<User[]>(
        "http://localhost:8000/getAllProfiles"
      );
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

  const isOpen = () => {
    setIsEdit(true);
  };

  const onClose = () => {
    setIsEdit(false);
    setUser(null);
  };

  const handleEdit = async (userId: string) => {
    isOpen();
    try {
      const res = await axios.get(
        `http://localhost:8000/getMyProfile/${userId}`
      );
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (err) {
      console.log("error in displaying data of user", err);
    }
  };

  const handleDelete = async (userId: string) => {
    const confirmation = window.confirm("Are you sure to delete this profile?");
    if (confirmation) {
      try {
        const res = await axios.delete(
          `http://localhost:8000/deleteUser/${userId}`
        );
        if (res.status === 200) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "User has been deleted!!",
            showConfirmButton: false,
            timer: 1500,
          });
          getUsers();
        }
      } catch (err) {
        console.log("error in deleting user", err);
      }
    }
  };

  return (
    <React.Fragment>
      <AdminNavbar />
      <table className={styles.mytable}>
        <thead>
          <tr className={styles.mytr}>
            <th className={styles.myth}>User ID</th>
            <th className={styles.myth}>Name</th>
            <th className={styles.myth}>Email</th>
            <th className={styles.myth}>Updated At</th>
            <th className={styles.myth}>Edit</th>
            <th className={styles.myth}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <Rows
              serialNumber={user.id}
              name={`${user.firstName} ${user.lastName}`}
              email={user.email}
              updatedAt={user.updatedAt}
              key={user.id}
              onEdit={() => handleEdit(user.id)}
              onDelete={() => handleDelete(user.id)}
            />
          ))}
        </tbody>
      </table>
      {isEdit && user !== null && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          user={user}
          getUsers={getUsers}
        />
      )}
    </React.Fragment>
  );
};
export default AllUsers;
