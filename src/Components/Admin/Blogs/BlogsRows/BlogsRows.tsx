import React from "react";
import moment from "moment";
import styles from "./BlogsRows.styles.module.css";

const BlogsRows = ({
  serialNumber,
  name,
  content,
  onSave,
  createdAt,
  status,
  image,
  setUpdatedStatus,
}: any) => {
  return (
    <tr className={styles.mytr} key={serialNumber}>
      <td className={styles.mytd}>{serialNumber}</td>
      <td className={styles.mytd}>{name}</td>
      <td className={styles.mytd}>
        {image ? (
          <img
            className={styles.blogImage}
            src={require(`../../../../assets/images/${image}`)}
            alt="blog"
          />
        ) : (
          <p>No Image</p>
        )}
      </td>
      <td className={styles.mytd}>{content}</td>
      <td className={styles.mytd}>
        <select
          name="language"
          id="language"
          className={styles.myDropdown}
          onChange={(e) => {
            const selectedLanguage = e.target.value;
            if (selectedLanguage === "pending") {
              setUpdatedStatus("Pending");
            } else if (selectedLanguage === "accept") {
              setUpdatedStatus("Accepted");
            } else if (selectedLanguage === "reject") {
              setUpdatedStatus("Rejected");
            }
          }}
        >
          <option value="selected">{status}</option>
          <option value="pending">Pending</option>
          <option value="accept">Accept</option>
          <option value="reject">Reject</option>
        </select>
      </td>
      <td className={styles.mytd}>{moment(createdAt).format("LLLL")}</td>
      <td className={styles.mytd}>
        <button className={styles.mybutton} onClick={onSave}>
          Save
        </button>
      </td>
    </tr>
  );
};

export default BlogsRows;
