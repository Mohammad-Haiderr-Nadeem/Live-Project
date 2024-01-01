import React, { useEffect, useState } from "react";
import styles from "./Blogs.styles.module.css";
import Navbar from "../Navbar/Navbar";
import BlogList from "./BlogsList/BlogsList";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import validator from "validator";

interface Blog {
  id: string;
  name: string;
  content: string;
  status: string;
  userId: string;
  createdAt: string;
}

const Blogs = () => {
  const [blogContent, setBlogContent] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [image, setImage] = useState("");

  const handlePost = async () => {
    try {
      const author = Cookies.get("firstName") + " " + Cookies.get("lastName");
      if (author && blogContent) {
        const res = await axios.post("http://localhost:8000/addBlog", {
          author,
          blogContent,
          status: "pending",
          userId: Cookies.get("myId"),
        });
        if (res.status === 200) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Blog has been posted!!",
            showConfirmButton: false,
            timer: 1500,
          });
          setBlogContent("");
          getBlogs();
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill all fields!",
        });
      }
    } catch (err: AxiosError | any) {
      if (err.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error in posting blog!",
        });
      }
      console.log("Error in adding the blog", err);
    }
  };

  const getImage = async () => {
    try {
      const imageResponse = await axios.get(
        `http://localhost:8000/getMyProfile/${Cookies.get("myId")}`
      );
      setImage(imageResponse.data.image);
    } catch (err) {
      console.log("error in getting images", err);
    }
  };

  const getBlogs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/allBlogs/${Cookies.get("myId")}`
      );
      if (res.status === 200) {
        setBlogs(res.data);
      }
    } catch (err) {
      console.log("error in getting users", err);
    }
  };

  useEffect(() => {
    getBlogs();
    getImage();
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.blogForm}>
        <div className={styles.profileContainer}>
          <img
            src={
              validator.isURL(image)
                ? image
                : image
                ? require(`../../assets/images/${image}`)
                : "image"
            }
            alt={`${Cookies.get("firstName")} ${Cookies.get(
              "lastName"
            )}'s Profile`}
            className={styles.profilePicture}
          />
          <p className={styles.userName}>
            {Cookies.get("firstName") + " " + Cookies.get("lastName")}
          </p>
        </div>
        <textarea
          className={styles.mytextarea}
          rows={4}
          placeholder="Write your blog here..."
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
        />
        <button className={styles.mybutton} onClick={handlePost}>
          Post Blog
        </button>
      </div>
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
export default Blogs;
