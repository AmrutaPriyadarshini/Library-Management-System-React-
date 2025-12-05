import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentReg() {
  const navigate = useNavigate();

  // Login protection
  useEffect(() => {
    if (sessionStorage.getItem("isLogin") !== "yes") {
      navigate("/login");
    }
  }, []);

  // Search Fields
  const [search, setSearch] = useState({
    id: "",
    regd: "",
    branch: "",
    name: "",
  });

  // Student Fields
  const [student, setStudent] = useState({
    id: "",
    name: "",
    regd: "",
    branch: "",
    mobile: "",
  });

  // Table Data
  const [tableData, setTableData] = useState([
    // Example initial dummy data
    { id: "001", name: "Rahul", regd: "22CSE01", branch: "CSE", mobile: "9876543210" },
    { id: "002", name: "Priya", regd: "22ETC05", branch: "ETC", mobile: "9123456780" }
  ]);

  const [error, setError] = useState("");

  // Search Handler
  const handleSearch = () => {
    const filtered = tableData.filter(
      s =>
        (search.id === "" || s.id.includes(search.id)) &&
        (search.regd === "" || s.regd.includes(search.regd)) &&
        (search.branch === "" || s.branch.toLowerCase().includes(search.branch.toLowerCase())) &&
        (search.name === "" || s.name.toLowerCase().includes(search.name.toLowerCase()))
    );
    if (filtered.length === 0) setError("No Records Found!");
    else setError("");
    setTableData(filtered);
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-2">
        <h1 className="fw-bold page-title m-0">📚 Student Register</h1>
        <button className="btn btn-danger btn-lg px-4 rounded-pill shadow hover-lift" onClick={logout}>
          🚪 Logout
        </button>
      </div>

      {/* Search Section */}
      <div className="row mb-5 g-3 justify-content-center search-section py-3 px-2 rounded-4 shadow-sm">

        <div className="col-lg-2 col-md-4 col-sm-6">
          <input className="form-control border-success fw-bold text-success"
            placeholder="Student ID"
            value={search.id}
            onChange={(e) => setSearch({ ...search, id: e.target.value })}
          />
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6">
          <input className="form-control border-success fw-bold text-success"
            placeholder="Regd No"
            value={search.regd}
            onChange={(e) => setSearch({ ...search, regd: e.target.value })}
          />
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6">
          <input className="form-control border-success fw-bold text-success"
            placeholder="Branch"
            value={search.branch}
            onChange={(e) => setSearch({ ...search, branch: e.target.value })}
          />
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6">
          <input className="form-control border-success fw-bold text-success"
            placeholder="Student Name"
            value={search.name}
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
          />
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6">
          <button className="btn btn-outline-success w-100 fw-bold rounded-pill" onClick={handleSearch}>
            🔍 Search
          </button>
        </div>

      </div>

      {/* Student Information */}
      <div className="card border-0 shadow-lg mb-5 rounded-4">
        <div className="card-header gradient-green text-white fw-bold fs-5 rounded-top-4">
          👤 Student Information
        </div>
        <div className="card-body">
          <div className="row g-4">

            <div className="col-md-4">
              <label className="form-label fw-semibold">Student ID</label>
              <input disabled className="form-control shadow-sm" value={student.id} />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Student Name</label>
              <input disabled className="form-control shadow-sm" value={student.name} />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Regd No.</label>
              <input disabled className="form-control shadow-sm" value={student.regd} />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Branch</label>
              <input disabled className="form-control shadow-sm" value={student.branch} />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Mobile No.</label>
              <input disabled className="form-control shadow-sm" value={student.mobile} />
            </div>

          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped text-center">
          <thead className='table-success text-uppercase fw-bold text-dark'>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Regd No.</th>
              <th>Branch</th>
              <th>Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((s, i) => (
              <tr key={i} onClick={() => setStudent(s)} style={{ cursor: "pointer" }}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.regd}</td>
                <td>{s.branch}</td>
                <td>{s.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && <div className="alert alert-danger fw-bold text-center fs-5 rounded-3">{error}</div>}
    </div>
  );
}
