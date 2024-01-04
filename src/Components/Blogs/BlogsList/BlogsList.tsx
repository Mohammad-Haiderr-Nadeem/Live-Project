import React, { useCallback, useEffect, useState } from "react";
import styles from "./BlogsList.styles.module.css";
import moment from "moment";
import validator from "validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const BlogList = ({ id, userId, name, content, createdAt, image }: any) => {
  const [photo, setPhoto] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState("");
  const navigate = useNavigate();

  const getImage = useCallback(async () => {
    try {
      const imageResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_LOCALHOST}/getMyProfile/${userId}`
      );
      setPhoto(imageResponse.data.image);
    } catch (err) {
      console.log("error in getting users", err);
    }
  }, [userId]);

  const getLikedBlogs = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_LOCALHOST}/getLikes`,
        {
          params: {
            id,
            userId: Cookies.get("myId"),
          },
        }
      );
      if (res.status === 200) {
        if (res.data.msg === "no") {
          setIsLiked(false);
        } else if (res.data.msg === "yes") {
          setIsLiked(true);
        }
      }
    } catch (err) {
      console.log("error in getting liked blogs", err);
    }
  };

  const getCountOfLikes = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_LOCALHOST}/getLikesCount/${id}`
      );
      if (res.status === 200) {
        if (res.data > 0) {
          setCount(res.data);
        } else {
          setCount("");
        }
      }
    } catch (err) {
      console.log("error in getting count of likes", err);
    }
  }, [id]);

  useEffect(() => {
    getLikedBlogs();
  });

  useEffect(() => {
    getCountOfLikes();
  }, [getCountOfLikes]);

  useEffect(() => {
    getImage();
  }, [getImage]);

  const handleOnClickName = (id: string) => {
    navigate(`/myblogs/${id}`);
  };

  const handleLike = async (id: string) => {
    try {
      const userId = Cookies.get("myId");
      if (!isLiked) {
        const res = await axios.patch(
          `${process.env.REACT_APP_BACKEND_LOCALHOST}/updateLike/${id}`,
          {
            userId,
          }
        );
        if (res.status === 200) {
          setIsLiked(true);
          getCountOfLikes();
        }
      } else {
        const res = await axios.patch(
          `${process.env.REACT_APP_BACKEND_LOCALHOST}/updateDislike/${id}`,
          {
            userId,
          }
        );
        if (res.status === 200) {
          setIsLiked(false);
          getCountOfLikes();
        }
      }
    } catch (err) {
      console.log("error in liking post", err);
    }
  };

  const handleComment = (id: string) => {
    navigate(`/comments/${id}`);
  };

  return (
    <React.Fragment>
      <div className={styles.socialContainer} key={id}>
        <div className={styles.left}>
          <img
            className={styles.pic}
            src={
              validator.isURL(photo)
                ? photo
                : photo
                ? require(`../../../assets/images/${photo}`)
                : "image"
            }
            alt="profile"
          />
        </div>
        <div className={styles.right}>
          <div className={styles.topWrapper}>
            <h3
              className={styles.handle}
              onClick={() => handleOnClickName(userId)}
            >
              {name}
            </h3>
            <p className={styles.time}>{moment(createdAt).format("llll")}</p>
          </div>
          <div className={styles.midWrapper}>
            {image && (
              <img
                className={styles.blogImage}
                src={require(`../../../assets/images/${image}`)}
                alt="blog"
              />
            )}
            <p>{content}</p>
          </div>
          <div className={styles.bottomWrapper}>
            <div
              className={
                isLiked
                  ? `${styles.liked} ${styles.button}`
                  : `${styles.like} ${styles.button}`
              }
              onClick={() => handleLike(id)}
            >
              Like <span className={styles.likeCount}>{count}</span>
            </div>
            <div className={`${styles.dislike} ${styles.button}`}>Dislike</div>
            <div
              className={`${styles.comment} ${styles.button}`}
              onClick={() => handleComment(id)}
            >
              Comment
            </div>
            <div className={`${styles.share} ${styles.button}`}>Share</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BlogList;
