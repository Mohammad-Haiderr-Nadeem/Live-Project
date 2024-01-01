import React from "react";
import styles from "./UserProfile.styles.module.css";
import validator from "validator";

const UserProfile = ({ image, email, firstName, lastName, gender }: any) => {
  return (
    <React.Fragment>
      <div className={styles.myProfile}>
        <div className={styles.profileImage}>
          <img
            src={
              validator.isURL(image)
                ? image
                : image
                ? require(`../../../../assets/images/${image}`)
                : "image"
            }
            alt="Avatar"
          />
        </div>
        <div className={styles.profileDetails}>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>First Name:</strong> {firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {lastName}
          </p>
          <p>
            <strong>Gender:</strong> {gender}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UserProfile;
