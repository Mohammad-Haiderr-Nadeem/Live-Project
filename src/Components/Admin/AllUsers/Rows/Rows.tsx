import React from "react";
import styles from "./Rows.styles.module.css";

const Rows = ({ serialNumber, name, email, onEdit, onDelete, updatedAt }: any) => {
  return (
    <tr className={styles.mytr} key={serialNumber}>
      <td className={styles.mytd}>{serialNumber}</td>
      <td className={styles.mytd}>{name}</td>
      <td className={styles.mytd}>{email}</td>
      <td className={styles.mytd}>{updatedAt}</td>
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
