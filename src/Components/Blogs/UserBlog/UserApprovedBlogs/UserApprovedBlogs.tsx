import React, { useCallback, useEffect, useState } from "react";
import styles from "./UserApprovedBlogs.styles.module.css";
import axios from "axios";
import BlogList from "../../BlogsList/BlogsList";

interface Blog {
  id: string;
  name: string;
  content: string;
  status: string;
  userId: string;
  createdAt: string;
}

const UserApprovedBlogs = ({ id }: any) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getBlogs = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_LOCALHOST}/getMyApprovedBlogs/${id}`
      );
      if (res.status === 200) {
        setBlogs(res.data.blogs);
      }
    } catch (err) {
      console.log("error in getting users", err);
    }
  }, [id]);

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return (
    <React.Fragment>
      {blogs.length > 0 ? (
        blogs?.map((blog) => (
          <BlogList
            id={blog.id}
            name={blog.name}
            content={blog.content}
            userId={blog.userId}
            createdAt={blog.createdAt}
            key={blog.id}
          />
        ))
      ) : (
        <p className={styles.myPara}>No Blogs to show.</p>
      )}
    </React.Fragment>
  );
};
export default UserApprovedBlogs;
