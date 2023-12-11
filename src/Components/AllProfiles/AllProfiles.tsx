import React, { useCallback, useEffect, useState } from "react";
import styles from "./AllProfiles.styles.module.css";
import axios from "axios";
import validator from "validator";
import Navbar from "../Navbar/Navbar";
import Cookies from "js-cookie";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  image: string;
}

axios.defaults.withCredentials = true;

const AllProfiles = () => {
  const [users, setUsers] = useState<User[]>([
    { id: "", firstName: "", lastName: "", email: "", gender: "", image: "" },
  ]);

  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get<User[]>(
        "http://localhost:8000/getAllProfiles"
      );

      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <React.Fragment>
      <Navbar />
      {users?.map(
        (user) =>
          String(user.id) !== Cookies.get("myId") && (
            <div className={styles.myProfile} key={user.id}>
              {user.id}
              {"   "}
              {Cookies.get("myId")}
              <div className={styles.profileImage}>
                <img
                  src={
                    validator.isURL(user.image)
                      ? user.image
                      : user.image
                      ? require(`../../assets/images/${user.image}`)
                      : "image"
                  }
                  alt={`${user.firstName} ${user.lastName}`}
                />
              </div>
              <div className={styles.profileDetails}>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>First Name:</strong> {user.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {user.lastName}
                </p>
                <p>
                  <strong>Gender:</strong> {user.gender}
                </p>
              </div>
            </div>
          )
      )}
    </React.Fragment>
  );
};
export default AllProfiles;
