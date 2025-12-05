/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoginLayout from "./components/LoginLayout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import StudentReg from "./pages/StudentReg";
import BookIssue from "./pages/BookIssue";
import BookReturn from "./pages/BookReturn";
import Books from "./pages/Books";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login/*" element={<Login />}>
 
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

          //  Nested login/admin routes
          //   <Route path="StudentReg" element={<StudentReg />} />
          //   <Route path="BookIssue" element={<BookIssue />} />
          //   <Route path="BookReturn" element={<BookReturn />} />
          //   <Route path="Books" element={<Books />} />