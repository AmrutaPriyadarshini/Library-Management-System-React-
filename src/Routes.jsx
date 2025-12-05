import LoginLayout from "./components/LoginLayout";

<Route element={<LoginLayout />}>
  <Route path="/student-register" element={<StudentRegister />} />
  <Route path="/book-issue" element={<BookIssue />} />
  <Route path="/book-return" element={<BookReturn />} />
  <Route path="/books" element={<Books />} />
</Route>
