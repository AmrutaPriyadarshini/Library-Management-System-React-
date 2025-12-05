import { Outlet, Link } from "react-router-dom";
import "./Layout.css";
import logo from "../assets/logo.png"; // place your Images/Logo.png here

export default function Layout() {
  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid px-5">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Library Logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Manage Library</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="page-content">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer>
        <div className="container-fluid">
          Designed By: <strong>Amruta</strong>
        </div>
      </footer>
    </div>
  );
}
