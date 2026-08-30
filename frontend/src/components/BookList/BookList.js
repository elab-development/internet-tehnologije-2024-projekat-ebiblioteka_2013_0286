import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./BookList.module.css";

function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((error) => {
        setError("Failed to fetch books");
      });
  }, []);
  return (
    <div className={styles.postListContainer}>
      <h2>Available Books</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
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
export default BookList;
