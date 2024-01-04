import React, { useCallback, useEffect, useState } from "react";
import styles from "./AllProfiles.styles.module.css";
import axios from "axios";
import validator from "validator";
import Navbar from "../../Navbar/Navbar";
import { useTranslation } from "react-i18next";
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
  const [friendsIdList, setFriendsIdList] = useState<string[]>([]);
  const { t } = useTranslation(["AllProfiles"]);

  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get<User[]>(
        `${process.env.REACT_APP_BACKEND_LOCALHOST}/getAllProfiles`
      );
      setUsers(res.data);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_LOCALHOST}/getMyProfile/${Cookies.get("myId")}`
      );
      setFriendsIdList(response.data.friends);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleAddFriend = async (friendId: string) => {
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_LOCALHOST}/addFriend/${Cookies.get("myId")}`,
      { friendId }
    );
    getUsers();
  };

  return (
    <React.Fragment>
      <Navbar />
      {users?.map(
        (user) =>
          String(user.id) !== Cookies.get("myId") &&
          !friendsIdList?.includes(String(user.id)) && (
            <div className={styles.myProfile} key={user.id}>
              <div className={styles.profileImage}>
                <img
                  src={
                    validator.isURL(user.image)
                      ? user.image
                      : user.image
                      ? require(`../../../assets/images/${user.image}`)
                      : "image"
                  }
                  alt={`${user.firstName} ${user.lastName}`}
                />
              </div>
              <div className={styles.profileDetails}>
                <p>
                  <strong>{t("firstname")}:</strong> {user.firstName}
                </p>
              </div>
              <div className={styles.myButtonContainer}>
                <button
                  className={styles.myButton}
                  onClick={() => handleAddFriend(user.id)}
                >
                  {t("addfriend")}
                </button>
              </div>
            </div>
          )
      )}
    </React.Fragment>
  );
};
export default AllProfiles;
