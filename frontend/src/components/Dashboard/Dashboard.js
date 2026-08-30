import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/admin/books", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setBooks(response.data);
      })
      .catch(() => {
        setError("Failed to fetch books");
        window.location.href = "/login";
      });
  }, []);

  return (
    // <div className={styles['dashboard-container']}>
    //     <h2>Admin Dashboard</h2>
    //     {error && <p className={styles.error}>{error}</p>}
    //     <table>
    //         <thead>
    //             <tr>
    //                 <th>ID</th>
    //                 <th>Username</th>
    //                 <th>Email</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {users.map(user => (
    //                 <tr key={user.id}>
    //                     <td>{user.id}</td>
    //                     <td>{user.username}</td>
    //                     <td>{user.email}</td>
    //                 </tr>
    //             ))}
    //         </tbody>
    //     </table>
    // </div>

    <div className={styles["dashboard - container"]}>
      <h2>Available Books</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.postList}>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className={styles.postItem}>
              <h3>{book.title}</h3>
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
              <p>
                <strong>Description:</strong> {book.description}
              </p>
              <p>
                <strong>Author:</strong>
                {book.author.name}
              </p>
              <Link
                to={`/api/books/${book.id}`}
                className={styles.readMoreButton}
              >
                Pogledaj detalje
              </Link>
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
