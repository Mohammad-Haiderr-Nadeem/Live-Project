import React from "react";
import moment from "moment";
import styles from "./MyBlogRows.styles.module.css";

const MyBlogRows = ({
  serialNumber,
  name,
  content,
  onDelete,
  createdAt,
  status,
}: any) => {
  return (
    <tr className={styles.mytr} key={serialNumber}>
      <td className={styles.mytd}>{serialNumber}</td>
      <td className={styles.mytd}>{name}</td>
      <td className={styles.mytd}>{content}</td>
      <td className={styles.mytd}>{status}</td>
      <td className={styles.mytd}>{moment(createdAt).format("LLLL")}</td>
      <td className={styles.mytd}>
        <button className={styles.mybutton} onClick={onDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MyBlogRows;
