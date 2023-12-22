import React, { useState } from "react";
import styles from "./Modal.styles.module.css";
import axios from "axios";
import Swal from "sweetalert2";

const Modal = ({ isOpen, onClose, user, getUsers }: any) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (firstName && lastName && email && gender) {
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("gender", gender);
      if (image) {
        formData.append("image", image);
      }
      const res = await axios.patch(
        `http://localhost:8000/updateUser/${user.id}`,
        formData
      );
      if (res.status === 200) {
        getUsers();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "User has been updated!!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      alert("Please fill all fields");
    }
    onClose();
  };

  return (
    <React.Fragment>
      <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
        <div className={styles.modalContent}>
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
          <h2>User Information</h2>
          <form onSubmit={(e) => handleSubmit(e)} className={styles.myform}>
            <label className={styles.mylabel}>
              First Name:
              <input
                type="text"
                className={styles.myinput}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label className={styles.mylabel}>
              Last Name:
              <input
                type="text"
                className={styles.myinput}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <label className={styles.mylabel}>
              Email:
              <input
                type="email"
                className={styles.myinput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className={styles.mylabel}>
              Gender:
              <div>
                <label className={styles.mylabel}>
                  <input
                    type="radio"
                    className={styles.myinput}
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                    required
                  />
                  Male
                </label>
                <label className={styles.mylabel}>
                  <input
                    type="radio"
                    className={styles.myinput}
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                    required
                  />
                  Female
                </label>
              </div>
            </label>
            <label className={styles.mylabel}>
              Image:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
            </label>
            <button className={styles.mybutton} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Modal;
