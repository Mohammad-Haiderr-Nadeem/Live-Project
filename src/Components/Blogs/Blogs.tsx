import React, { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
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
  image: string;
  liked: string;
  createdAt: string;
}

const Blogs = () => {
  const [blogContent, setBlogContent] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const handlePost = async () => {
    try {
      const author = Cookies.get("firstName") + " " + Cookies.get("lastName");
      if (author && blogContent) {
        const formData = new FormData();
        const status = "pending";
        const liked = "no";
        formData.append("image", selectedImage || "");
        formData.append("userId", Cookies.get("myId") || "");
        formData.append("author", author);
        formData.append("blogContent", blogContent);
        formData.append("status", status);
        formData.append("liked", liked);

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_LOCALHOST}/addBlog`, formData);

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
          setSelectedImage(null);
          addLikeToBlogs(res.data.blog.id);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill all fields!",
        });
      }
    } catch (err) {
      console.log("Error in adding the blog", err);
    }
  };

  const getImage = async () => {
    try {
      const imageResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_LOCALHOST}/getMyProfile/${Cookies.get("myId")}`
      );
      setImage(imageResponse.data.image);
    } catch (err) {
      console.log("error in getting images", err);
    }
  };

  const getBlogs = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_LOCALHOST}/allBlogs/${Cookies.get("myId")}`
      );
      if (res.status === 200) {
        setBlogs(res.data);
      }
    } catch (err) {
      console.log("error in getting users", err);
    }
  };

  const addLikeToBlogs = async (id: string) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_LOCALHOST}/postLike`, {
        userId: Cookies.get("myId"),
        blogsId: id,
      });
    } catch (err) {
      console.log("error in adding likes", err);
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
        <div className={styles.textAreaContainer}>
          <textarea
            className={styles.mytextarea}
            rows={4}
            placeholder="Write your blog here..."
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
          />
          <div className={styles.imageUploadContainer}>
            <label htmlFor="imageUpload" className={styles.imageUploadIcon}>
              <FaImage />
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
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
            image={blog.image}
          />
        ))
      ) : (
        <p className={styles.myPara}>No Blogs to show.</p>
      )}
    </React.Fragment>
  );
};
export default Blogs;
