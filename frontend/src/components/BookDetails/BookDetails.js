import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./BookDetails.module.css";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBook(response.data.book);
      })
      .catch((error) => {
        setError("Failed to fetch book details");
      });
  }, [id]);
  return (
    <div className={styles.postDetailsContainer}>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {book ? (
        <div className={styles.postDetails}>
          <h2>{book.title}</h2>
          <p>
            <strong>Genre:</strong> {book.genre}
          </p>
          <p>
            <strong>Author:</strong> {book.author.name}
          </p>
          <p>{book.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BookDetails;
