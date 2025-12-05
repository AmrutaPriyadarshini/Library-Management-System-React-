import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState({
    BookID: "",
    Title: "",
    Author: "",
    ISBN: "",
    Publication: "",
    Subject: "",
  });

  const handleSearch = async () => {
    const res = await axios.get("http://localhost:3000/api/books", {
      params: search,
    });
    setBooks(res.data);
  };

  useEffect(() => {
    handleSearch(); // load all books initially
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <h1>
            “Connecting people to knowledge,
            <br />
            one book at a time.”
          </h1>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <div className="container my-4">
        <div className="row mb-4 justify-content-center">

          {Object.entries(search).map(([key, value]) => (
            <div className="col-lg-2 col-md-4 col-sm-6 mb-2" key={key}>
              <input
                type="text"
                className="form-control border-success fw-bold text-success"
                placeholder={key.replace(/([A-Z])/g, " $1")}
                value={value}
                onChange={(e) =>
                  setSearch({ ...search, [key]: e.target.value })
                }
              />
            </div>
          ))}

          {/* Search Button */}
          <div className="col-lg-2 col-md-4 col-sm-6 mb-2">
            <button
              className="btn btn-outline-success w-100 fw-bold"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* TABLE SECTION */}
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
                books.map((b) => (
                  <tr key={b.BookID}>
                    <td>{b.BookID}</td>
                    <td>{b.Title}</td>
                    <td>{b.Author}</td>
                    <td>{b.ISBN}</td>
                    <td>{b.Publication}</td>
                    <td>{b.Subject}</td>
                    <td>{b.Stock}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-danger fw-bold">
                    No Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
