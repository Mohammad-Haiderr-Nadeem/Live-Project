import React, { useCallback, useEffect, useState } from "react";
import styles from "./Comments.styles.module.css";
import Navbar from "../../Navbar/Navbar";
import MyBlog from "./MyBlog/MyBlog";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";

interface Comment {
  id: string;
  userId: string;
  blogsId: string;
  username: string;
  comment: string;
  createdAt: string;
}

const Comments = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const myId = Cookies.get("myId");
  const myName = Cookies.get("firstName") + " " + Cookies.get("lastName");

  const handleCommentChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewComment(e.target.value);
  };

  const handlePostComment = async () => {
    try {
      if (newComment) {
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_LOCALHOST}/postComment`,
          {
            comment: newComment,
            blogsId: id,
            userId: myId,
            username: myName,
          }
        );
        if (res.status === 200) {
          setNewComment("");
          getComments();
        }
      }
    } catch (err) {
      console.log("error in adding blog", err);
    }
  };

  const getComments = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_LOCALHOST}/getComments`,
        {
          params: {
            id,
          },
        }
      );
      if (res.status === 200) {
        setComments(res.data);
      }
    } catch (err) {
      console.log("error in getting list of comments", err);
    }
  }, [id]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <React.Fragment>
      <Navbar />
      <MyBlog id={id} />
      <div className={styles.commentsContainer}>
        <h1>Comments</h1>
        <div className={styles.commentInputContainer}>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
            className={styles.commentInput}
          />
          <button onClick={handlePostComment} className={styles.postButton}>
            Post Comment
          </button>
        </div>
        <div className={styles.commentList}>
          {comments?.map((comment, index) => (
            <div key={index} className={styles.comment}>
              <div className={styles.commentHeader}>
                <span className={styles.commentAuthor}>{comment.username}</span>
                <span className={styles.commentTime}>
                  {moment(comment.createdAt).format("lll")}
                </span>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Comments;
