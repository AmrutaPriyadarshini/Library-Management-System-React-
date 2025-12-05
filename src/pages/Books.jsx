import React, { useEffect, useState } from "react";
import {
  searchBooks,
  getFirst,
  getLast,
  getNext,
  getPrev,
  addBook,
  updateBook,
  deleteBook
} from "../services/bookAPI";

const Books = () => {
  const [book, setBook] = useState({});
  const [search, setSearch] = useState({});
  const [tableData, setTableData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input field changes
  const handleChange = (e) => setBook({ ...book, [e.target.name]: e.target.value });

  // Handle search input field changes
  const handleSearch = (e) => setSearch({ ...search, [e.target.name]: e.target.value });

  const loadFirst = async () => {
    const res = await getFirst();
    setBook(res.data);
  };

  const loadLast = async () => {
    const res = await getLast();
    setBook(res.data);
  };

  const loadNext = async () => {
    if (!book.BookID) return;
    const res = await getNext(book.BookID);
    setBook(res.data);
  };

  const loadPrev = async () => {
    if (!book.BookID) return;
    const res = await getPrev(book.BookID);
    setBook(res.data);
  };

  const handleSearchClick = async () => {
    const res = await searchBooks(search);
    setTableData(res.data);
  };

  const handleNew = () => {
    setBook({});
    setIsEditMode(false);
  };

  const handleEdit = () => setIsEditMode(true);

  const handleSave = async () => {
    if (isEditMode) {
      await updateBook(book);
      setMessage("✔ Book updated!");
    } else {
      await addBook(book);
      setMessage("✔ Book added!");
    }
    setIsEditMode(false);
  };

  const handleDelete = async () => {
    if (!book.BookID) return;
    await deleteBook(book.BookID);
    setMessage("✔ Book deleted!");
    loadLast();
  };

  useEffect(() => loadLast(), []);

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="fw-bold page-title">📝 Manage Books</h1>
        <a href="/" className="btn btn-danger btn-lg rounded-pill">🚪 Logout</a>
      </div>

      {/* 🔍 Search */}
      <div className="row mb-5 g-3 p-3 rounded-4 shadow-sm bg-white">
        {["BookID", "Title", "Author", "ISBN", "Publication", "Subject"].map((item) => (
          <div className="col-lg-2 col-md-4 col-sm-6" key={item}>
            <input
              name={item}
              className="form-control border-success fw-bold text-success"
              placeholder={item}
              onChange={handleSearch}
            />
          </div>
        ))}
        <div className="col-lg-2 col-md-4 col-sm-6">
          <button className="btn btn-outline-success w-100 fw-bold" onClick={handleSearchClick}>
            🔍 Search
          </button>
        </div>
      </div>

      {/* 📚 Book Info */}
      <div className="card shadow-lg rounded-4 mb-4">
        <div className="card-header gradient-green text-white fw-bold fs-5">📚 Books Information</div>
        <div className="card-body">
          <div className="row g-4">
            {[
              ["BookID", "Book ID"],
              ["Title", "Title"],
              ["Author", "Author"],
              ["ISBN", "ISBN No."],
              ["Publication", "Publication"],
              ["Subject", "Subject"],
              ["OrgStock", "Stock"],
              ["CurStock", "Current Stock"]
            ].map(([name, label]) => (
              <div className="col-md-4" key={name}>
                <label className="form-label fw-semibold">{label}</label>
                <input
                  name={name}
                  value={book[name] || ""}
                  disabled={!isEditMode && name !== "BookID"}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🛠 Actions */}
      <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
        <button className="btn btn-outline-success" onClick={loadFirst}>⏮ First</button>
        <button className="btn btn-outline-success" onClick={loadPrev}>⬅ Prev</button>
        <button className="btn btn-success" onClick={handleNew}>➕ New</button>
        <button className="btn btn-warning text-dark" onClick={handleEdit}>✏ Edit</button>
        <button className="btn btn-primary" onClick={handleSave}>💾 Save</button>
        <button className="btn btn-secondary" onClick={() => setIsEditMode(false)}>❌ Cancel</button>
        <button className="btn btn-danger" onClick={handleDelete}>🗑 Delete</button>
        <button className="btn btn-outline-success" onClick={loadNext}>Next ➡</button>
        <button className="btn btn-outline-success" onClick={loadLast}>Last ⏭</button>
      </div>

      {/* 📋 Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-success text-uppercase fw-bold">
            <tr>
              <th>ID</th><th>Title</th><th>Author</th><th>ISBN</th>
              <th>Publication</th><th>Subject</th><th>Stock</th><th>Available</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((b, i) => (
              <tr key={i} onClick={() => setBook(b)}>
                <td>{b.BookID}</td>
                <td>{b.Title}</td>
                <td>{b.Author}</td>
                <td>{b.ISBN}</td>
                <td>{b.Publication}</td>
                <td>{b.Subject}</td>
                <td>{b.OrgStock}</td>
                <td>{b.CurStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ⚠ Error / Success */}
      {message && (
        <div className="alert alert-info fw-bold text-center rounded-3 shadow-sm">
          {message}
        </div>
      )}
    </div>
  );
};

export default Books;
