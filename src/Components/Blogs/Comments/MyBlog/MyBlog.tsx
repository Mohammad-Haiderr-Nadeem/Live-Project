import React, { useCallback, useEffect, useState } from "react";
import styles from "./MyBlog.styles.module.css";
import moment from "moment";
import validator from "validator";
import axios from "axios";

interface Blog {
  id: string;
  name: string;
  content: string;
  status: string;
  userId: string;
  image: string;
  liked: string;
  createdAt: string;
}

const MyBlog = ({ id }: any) => {
  const [photo, setPhoto] = useState("");
  const [blogs, setBlogs] = useState<Blog>();

  const getBlogs = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_LOCALHOST}/getBlog/${id}`
      );
      if (res.status === 200) {
        setBlogs(res.data);
      }
    } catch (err) {
      console.log("error in getting users", err);
    }
  }, [id]);

  const getImage = useCallback(async () => {
    try {
      if (blogs?.userId) {
        const imageResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_LOCALHOST}/getMyProfile/${blogs?.userId}`
        );
        setPhoto(imageResponse.data.image);
      }
    } catch (err) {
      console.log("error in getting users", err);
    }
  }, [blogs]);

  useEffect(() => {
    getImage();
  }, [getImage]);

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return (
    <React.Fragment>
      {blogs && photo ? (
        <div className={styles.socialContainer} key={id}>
          <div className={styles.left}>
            <img
              className={styles.pic}
              src={
                validator.isURL(photo)
                  ? photo
                  : photo
                  ? require(`../../../../assets/images/${photo}`)
                  : "image"
              }
              alt="profile"
            />
          </div>
          <div className={styles.right}>
            <div className={styles.topWrapper}>
              <h3 className={styles.handle}>{blogs?.name}</h3>
              <p className={styles.time}>
                {moment(blogs.createdAt).format("llll")}
              </p>
            </div>
            <div className={styles.midWrapper}>
              {blogs?.image && (
                <img
                  className={styles.blogImage}
                  src={require(`../../../../assets/images/${blogs.image}`)}
                  alt="blog"
                />
              )}
              <p>{blogs?.content}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className={styles.myPara}>Loading.........</p>
      )}
    </React.Fragment>
  );
};

export default MyBlog;
