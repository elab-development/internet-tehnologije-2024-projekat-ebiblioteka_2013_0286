import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function PrivateRoute({ children }) {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setAuth(true);
          setLoading(false);
        })
        .catch(() => {
          setAuth(false);
          setLoading(false);
        });
    } else {
      setAuth(false);
      setLoading(false);
    }
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return auth ? children : <Navigate to="/api/login" />;
}

export default PrivateRoute;
