import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BookReturn() {
  const [search, setSearch] = useState({
    IssueID: "",
    BookID: "",
    StudentID: "",
    IssueDate: "",
    ReturnDate: "",
  });

  const [selected, setSelected] = useState(null);
  const [records, setRecords] = useState([]);

  const handleSearch = async () => {
    const res = await axios.get("http://localhost:5000/issue/search", {
      params: search,
    });
    setRecords(res.data);
  };

  const handleSelect = (item) => {
    setSelected(item);
  };

  const handleReturn = async () => {
    await axios.put(`http://localhost:5000/issue/return/${selected.IssueID}`, {
      ReturnDate: selected.ReturnDate,
    });
    alert("Book Returned Successfully!");
    handleSearch();
  };

  return (
    <div className="container py-4">
      <h1 className="fw-bold mb-3">📓 Book Return Register</h1>

      {/* Search Section */}
      <div className="d-flex gap-2 mb-4">
        <input className="form-control"
          placeholder="Issue ID"
          onChange={(e) => setSearch({ ...search, IssueID: e.target.value })}
        />
        <input className="form-control"
          placeholder="Book ID"
          onChange={(e) => setSearch({ ...search, BookID: e.target.value })}
        />
        <input className="form-control"
          placeholder="Student ID"
          onChange={(e) => setSearch({ ...search, StudentID: e.target.value })}
        />
        <button className="btn btn-success fw-bold"
          onClick={handleSearch}>🔍 Search</button>
      </div>

      {/* Table Result */}
      <table className="table table-bordered text-center">
        <thead className="table-success">
          <tr>
            <th>Issue ID</th>
            <th>Student ID</th>
            <th>Book ID</th>
            <th>Issue Date</th>
            <th>Return Date</th>
            <th>Status</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.IssueID}>
              <td>{r.IssueID}</td>
              <td>{r.StudentID}</td>
              <td>{r.BookID}</td>
              <td>{r.IssueDate.split("T")[0]}</td>
              <td>{r.ReturnDate ? r.ReturnDate.split("T")[0] : "-"}</td>
              <td>{r.IssueStatus ? "Returned" : "Pending"}</td>
              <td>
                <button onClick={() => setSelected(r)}
                  className="btn btn-primary btn-sm">Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Selected Details + Return Action */}
      {selected && (
        <div className="card p-3 shadow">
          <h5 className="fw-bold">Submit Book Return</h5>
          <p><b>Issue ID:</b> {selected.IssueID}</p>
          <p><b>Book ID:</b> {selected.BookID}</p>
          <p><b>Student ID:</b> {selected.StudentID}</p>

          <input
            type="date"
            className="form-control mb-3"
            value={selected.ReturnDate || ""}
            onChange={(e) =>
              setSelected({ ...selected, ReturnDate: e.target.value })
            }
          />
          <button className="btn btn-warning fw-bold"
            onClick={handleReturn}>✏ Return Book</button>
        </div>
      )}
    </div>
  );
}
