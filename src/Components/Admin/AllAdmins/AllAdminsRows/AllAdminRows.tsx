import React from "react";
import moment from "moment";
import styles from "./AllAdminsRows.styles.module.css";
import validator from "validator";

const AllAdminRows = ({
  serialNumber,
  firstName,
  email,
  createdAt,
  lastName,
  image,
}: any) => {
  return (
    <tr className={styles.mytr} key={serialNumber}>
      <td className={styles.mytd}>
        <img
          src={
            validator.isURL(image)
              ? image
              : image
              ? require(`../../../../assets/images/${image}`)
              : "image"
          }
          alt="User Avatar"
          className={styles.myimg}
        />
      </td>
      <td className={styles.mytd}>{firstName}</td>
      <td className={styles.mytd}>{lastName}</td>
      <td className={styles.mytd}>{email}</td>
      <td className={styles.mytd}>{moment(createdAt).format("LLL")}</td>
    </tr>
  );
};

export default AllAdminRows;
