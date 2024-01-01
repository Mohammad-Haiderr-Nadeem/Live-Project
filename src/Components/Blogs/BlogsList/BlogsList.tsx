import React, { useCallback, useEffect, useState } from "react";
import styles from "./BlogsList.styles.module.css";
import moment from "moment";
import validator from "validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogList = ({ id, userId, name, content, createdAt }: any) => {
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const getImage = useCallback(async () => {
    try {
      const imageResponse = await axios.get(
        `http://localhost:8000/getMyProfile/${userId}`
      );
      setImage(imageResponse.data.image);
    } catch (err) {
      console.log("error in getting users", err);
    }
  }, [userId]);

  useEffect(() => {
    getImage();
  }, [getImage]);

  const handleOnClickName = (id: string) => {
    navigate(`/myblogs/${id}`);
  };

  return (
    <React.Fragment>
      <div className={styles.socialContainer} key={id}>
        <div className={styles.left}>
          <img
            className={styles.pic}
            src={
              validator.isURL(image)
                ? image
                : image
                ? require(`../../../assets/images/${image}`)
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
            <p>{content}</p>
          </div>
          <div className={styles.bottomWrapper}>
            <div className={`${styles.like} ${styles.button}`}>Like</div>
            <div className={`${styles.dislike} ${styles.button}`}>Dislike</div>
            <div className={`${styles.comment} ${styles.button}`}>Comment</div>
            <div className={`${styles.share} ${styles.button}`}>Share</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BlogList;
