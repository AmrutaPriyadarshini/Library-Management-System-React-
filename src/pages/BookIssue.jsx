import { useState, useEffect } from "react";
//import "./BookIssue.css";

export default function BookIssue() {
  const [search, setSearch] = useState({
    bookId: "",
    studentId: "",
    issueId: "",
    date: "",
  });

  const [form, setForm] = useState({
    studentId: "",
    bookId: "",
    issueDate: "",
    issueId: "",
    studentName: "",
    regdNo: "",
    branch: "",
    bookName: "",
    isbn: "",
  });

  const [tableData, setTableData] = useState([]);

  // Fetch list (table)
  const loadTable = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/bookissue");
      const data = await res.json();
      setTableData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTable();
  }, []);

  // Search Handler
  const handleSearch = async () => {
    const res = await fetch("http://localhost:3000/api/bookissue/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(search),
    });
    const data = await res.json();
    setTableData(data);
  };

  // Action buttons (Next, Prev, Save etc.) — backend endpoints needed
  const handleAction = (action) => {
    alert(`Action "${action}" will be connected to backend soon 👍`);
  };

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-2">
        <h1 className="fw-bold page-title m-0">📖 Book Issue Register</h1>
        <a href="/" className="btn btn-danger btn-lg px-4 rounded-pill shadow hover-lift">🚪 Logout</a>
      </div>

      {/* SEARCH AREA */}
      <div className="row mb-5 g-3 justify-content-center search-section py-3 px-2 rounded-4 shadow-sm">
        <input className="col-lg-2 col-md-4 col-sm-6 form-control"
          placeholder="Book ID"
          onChange={(e) => setSearch({ ...search, bookId: e.target.value })}
        />
        <input className="col-lg-2 col-md-4 col-sm-6 form-control"
          placeholder="Student ID"
          onChange={(e) => setSearch({ ...search, studentId: e.target.value })}
        />
        <input className="col-lg-2 col-md-4 col-sm-6 form-control"
          placeholder="Issue ID"
          onChange={(e) => setSearch({ ...search, issueId: e.target.value })}
        />
        <input className="col-lg-2 col-md-4 col-sm-6 form-control"
          type="date"
          onChange={(e) => setSearch({ ...search, date: e.target.value })}
        />
        <button className="btn btn-outline-success col-lg-2" onClick={handleSearch}>🔍 Search</button>
      </div>

      {/* ISSUE INFORMATION */}
      <div className="card border-0 shadow-lg mb-5 rounded-4 card-animate">
        <div className="card-header gradient-green text-white fw-bold fs-5 rounded-top-4">
          📗 Book Issue Information
        </div>
        <div className="card-body">
          <div className="row g-4">
            {/* Student ID */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Student ID</label>
              <input className="form-control" value={form.studentId} disabled />
            </div>
            {/* Book ID */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Book ID</label>
              <input className="form-control" value={form.bookId} disabled />
            </div>
            {/* Issue Date */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Issue Date</label>
              <input className="form-control" type="date" value={form.issueDate} disabled />
            </div>
          </div>

          <hr className="styled-hr my-4" />

          <div className="row g-4">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Issue ID</label>
              <input className="form-control" value={form.issueId} disabled />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Student Name</label>
              <input className="form-control" value={form.studentName} disabled />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Regd No.</label>
              <input className="form-control" value={form.regdNo} disabled />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Branch</label>
              <input className="form-control" value={form.branch} disabled />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Book Name</label>
              <input className="form-control" value={form.bookName} disabled />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">ISBN No.</label>
              <input className="form-control" value={form.isbn} disabled />
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="card border-0 shadow-lg mb-4 rounded-4 card-animate text-center p-3">
        {["First","Prev","New","Edit","Save","Cancel","Delete","Next","Last"].map(btn => (
          <button key={btn} className="btn btn-outline-success m-1 rounded-pill"
            onClick={() => handleAction(btn)}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped text-center">
          <thead className="table-success text-uppercase fw-bold text-dark">
            <tr>
              <th>Issue ID</th>
              <th>Student ID</th>
              <th>Book ID</th>
              <th>Issue Date</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.IssueID}>
                <td>{row.IssueID}</td>
                <td>{row.StudentID}</td>
                <td>{row.BookID}</td>
                <td>{row.IssueDate?.substring(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
