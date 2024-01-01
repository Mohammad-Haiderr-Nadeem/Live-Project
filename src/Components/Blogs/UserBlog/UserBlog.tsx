import React, { useCallback, useEffect, useState } from "react";
import styles from "./UserBlog.styles.module.css";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile/UserProfile";
import UserApprovedBlogs from "./UserApprovedBlogs/UserApprovedBlogs";

const UserBlog = () => {
  const [fisrtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();

  const getUser = useCallback(async () => {
    const res = await axios.get(`http://localhost:8000/getMyProfile/${id}`);
    setFirstName(res.data.firstName);
    setLastName(res.data.lastName);
    setGender(res.data.gender);
    setEmail(res.data.email);
    setImage(res.data.image);
  }, [id]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <React.Fragment>
      <Navbar />
      <UserProfile
        image={image}
        email={email}
        gender={gender}
        firstName={fisrtName}
        lastName={lastName}
      />
      <UserApprovedBlogs id={id} />
    </React.Fragment>
  );
};
export default UserBlog;
