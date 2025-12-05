import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [search, setSearch] = useState({
    BookID: "",
    Title: "",
    Author: "",
    ISBN: "",
    Publication: "",
    Subject: ""
  });

  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  // Load books initially (same as Page_Load)
  useEffect(() => {
    fetchBooks();
  }, []);

  // GET books from API
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/books", {
        params: search,
      });

      if (res.data.data?.length > 0) {
        setBooks(res.data.data);
        setMessage("");
      } else {
        setBooks([]);
        setMessage("No records found");
      }
    } catch (err) {
      setMessage("Error In Data: " + err.message);
    }
  };

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchBooks();
  };

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="hero d-flex align-items-center justify-content-center text-center text-white"
        style={{
          backgroundImage: "url('../assets/Hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "60px 0",
          width: "100%",
        }}
      >
        <h1 style={{ fontSize: "2.1rem", fontStyle: "italic", fontWeight: "700" }}>
          “Connecting people to knowledge, one book at a time.”
        </h1>
      </section>

      <div className="container my-4">
        {/* SEARCH BAR */}
        <div className="row mb-4 justify-content-center">

          <div className="col-lg-2 col-md-4 col-sm-6 mb-2">
            <input name="BookID" onChange={handleChange} className="form-control border-success fw-bold text-success" placeholder="Book ID" />
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6 mb-2">
            <input name="Title" onChange={handleChange} className="form-control border-success fw-bold text-success" placeholder="Book Title" />
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6 mb-2">
            <input name="Author" onChange={handleChange} className="form-control border-success fw-bold text-success" placeholder="Author Name" />
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6 mb-2">
            <input name="ISBN" onChange={handleChange} className="form-control border-success fw-bold text-success" placeholder="ISBN" />
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6 mb-2">
            <input name="Publication" onChange={handleChange} className="form-control border-success fw-bold text-success" placeholder="Publication" />
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6 mb-2">
            <input name="Subject" onChange={handleChange} className="form-control border-success fw-bold text-success" placeholder="Subject" />
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6 mb-2">
            <button className="btn btn-outline-success w-100 fw-bold" onClick={handleSearch}>Search</button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped text-center">
            <thead className="table-success text-uppercase fw-bold text-dark">
              <tr>
                <th>Book ID</th>
                <th>Book Title</th>
                <th>Author Name</th>
                <th>ISBN No.</th>
                <th>Publication</th>
                <th>Subject</th>
                <th>Available Stock</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((b, idx) => (
                  <tr key={idx}>
                    <td>{b.BookID}</td>
                    <td>{b.Title}</td>
                    <td>{b.Author}</td>
                    <td>{b.ISBN}</td>
                    <td>{b.Publication}</td>
                    <td>{b.Subject}</td>
                    <td>{b.CurrentStock}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-danger fw-bold">
                    {message}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {message && books.length > 0 && (
          <p className="text-danger fw-bold">{message}</p>
        )}
      </div>
    </>
  );
}

