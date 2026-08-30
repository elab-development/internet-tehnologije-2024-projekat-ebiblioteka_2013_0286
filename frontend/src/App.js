import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BookList from "./components/BookList/BookList";
import PrivateRoute from "./PrivateRoute";
import BookDetails from "./components/BookDetails/BookDetails";
import Adminlogin from "./components/Login/Adminlogin";
import AdminRoute from "./AdminRoute";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
      <Routes>
        <Route path="/api/login" element={<Adminlogin />} />
        <Route
          path="/api/books"
          element={
            <PrivateRoute>
              <BookList />
            </PrivateRoute>
          }
        />
        <Route
          path="/api/books/:id"
          element={
            <PrivateRoute>
              <BookDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/api/dashboard"
          S
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
