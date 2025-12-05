import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import "./LoginLayout.css";

export default function LoginLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="container-fluid p-0 login-layout">
      {/* Mobile Hamburger Button */}
      <button className="menu-toggle d-md-none p-3" onClick={toggleMenu}>
        ☰
      </button>

      {/* Overlay */}
      <div
        id="overlay"
        className={menuOpen ? "active" : ""}
        onClick={toggleMenu}
      ></div>

      <div className="row g-0">
        {/* Sidebar */}
        <div
          id="sidebar"
          className={`col-md-3 col-lg-2 sidebar ${menuOpen ? "active" : ""}`}
        >
          <Link to="/StudentReg">Student Register</Link>
          <Link to="/BookIssue">Book Issue</Link>
          <Link to="/BookReturn">Book Return</Link>
          <Link to="/Books">Manage Books</Link>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
