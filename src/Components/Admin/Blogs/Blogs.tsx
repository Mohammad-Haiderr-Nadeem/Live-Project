import React, { useEffect, useState } from "react";
import styles from "./Blogs.styles.module.css";
import AdminNavbar from "../Navbar/Navbar";
import BlogsRows from "./BlogsRows/BlogsRows";
import axios from "axios";
import Swal from "sweetalert2";

interface Blog {
  id: string;
  name: string;
  content: string;
  status: string;
  createdAt: string;
}

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([
    { id: "", name: "", content: "", status: "", createdAt: "" },
  ]);
  const [updatedStatus, setUpdatedStatus] = useState("");

  const getBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/getBlogs");
      setBlogs(res.data);
    } catch (err) {
      console.log("error in getting blogs", err);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);

  const handleSave = async (id: string) => {
    try {
      if (updatedStatus) {
        const res = await axios.patch(
          `http://localhost:8000/updateBlog/${id}`,
          {
            updatedStatus,
          }
        );
        if (res.status === 200) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Status has been updated!!",
            showConfirmButton: false,
            timer: 1500,
          });
          setUpdatedStatus("");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select a status!",
        });
      }
    } catch (err) {
      console.log("error in saving status", err);
    }
  };

  return (
    <React.Fragment>
      <AdminNavbar />
      <table className={styles.mytable}>
        <thead>
          <tr className={styles.mytr}>
            <th className={styles.myth}>Blog ID</th>
            <th className={styles.myth}>Name</th>
            <th className={styles.myth}>Content</th>
            <th className={styles.myth}>Status</th>
            <th className={styles.myth}>Created At</th>
            <th className={styles.myth}>Save</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => (
            <BlogsRows
              serialNumber={blog.id}
              name={blog.name}
              status={blog.status}
              createdAt={blog.createdAt}
              content={blog.content}
              key={blog.id}
              onSave={() => handleSave(blog.id)}
              setUpdatedStatus={setUpdatedStatus}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};
export default AdminBlogs;
