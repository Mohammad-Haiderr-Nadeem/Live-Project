import React from "react";
import moment from "moment";
import styles from "./Rows.styles.module.css";
import validator from "validator";

const Rows = ({
  serialNumber,
  name,
  email,
  onEdit,
  onDelete,
  createdAt,
  gender,
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
      <td className={styles.mytd}>{name}</td>
      <td className={styles.mytd}>{email}</td>
      <td className={styles.mytd}>{gender}</td>
      <td className={styles.mytd}>{moment(createdAt).format("LLL")}</td>
      <td className={styles.mytd}>
        <button className={styles.mybutton} onClick={onEdit}>
          Edit
        </button>
      </td>
      <td className={styles.mytd}>
        <button className={styles.mybutton} onClick={onDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Rows;
