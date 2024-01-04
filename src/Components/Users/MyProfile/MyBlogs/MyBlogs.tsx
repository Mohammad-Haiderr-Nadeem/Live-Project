import React, { useEffect, useState } from "react";
import styles from "./MyBlogs.styles.module.css";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import MyBlogRows from "./MyBlogRows/MyBlogRows";
import Cookies from "js-cookie";

interface Blog {
  id: string;
  userId: string;
  name: string;
  content: string;
  status: string;
  createdAt: string;
}

const MyBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getBlogs = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_LOCALHOST}/getMyBlogs/${Cookies.get(
          "myId"
        )}`
      );
      setBlogs(res.data.blogs);
    } catch (err: AxiosError | any) {
      if (err.response.status === 404) {
        setBlogs([]);
      }
      console.log("error in getting blogs", err);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (id) {
        const res = await axios.delete(
          `${process.env.REACT_APP_BACKEND_LOCALHOST}/deleteBlog/${id}`
        );
        if (res.status === 200) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Blog has been deleted!!",
            showConfirmButton: false,
            timer: 1500,
          });
          getBlogs();
        }
      }
    } catch (err) {
      console.log("error in saving status", err);
    }
  };

  return (
    <React.Fragment>
      {blogs.length > 0 ? (
        <table className={styles.mytable}>
          <thead>
            <tr className={styles.mytr}>
              <th className={styles.myth}>Blog ID</th>
              <th className={styles.myth}>Name</th>
              <th className={styles.myth}>Content</th>
              <th className={styles.myth}>Status</th>
              <th className={styles.myth}>Created At</th>
              <th className={styles.myth}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogs?.map((blog) => (
              <MyBlogRows
                serialNumber={blog.id}
                name={blog.name}
                status={blog.status}
                createdAt={blog.createdAt}
                content={blog.content}
                key={blog.id}
                onDelete={() => handleDelete(blog.id)}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.myPara}>No Blogs Found.</p>
      )}
    </React.Fragment>
  );
};
export default MyBlogs;
