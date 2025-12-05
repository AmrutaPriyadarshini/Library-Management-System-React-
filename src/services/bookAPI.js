import axios from "axios";

const API = "http://localhost:5000/books";

export const searchBooks = (params) => axios.get(`${API}/search`, { params });
export const getFirst = () => axios.get(`${API}/first`);
export const getLast = () => axios.get(`${API}/last`);
export const getNext = (id) => axios.get(`${API}/next/${id}`);
export const getPrev = (id) => axios.get(`${API}/prev/${id}`);
export const addBook = (data) => axios.post(`${API}/add`, data);
export const updateBook = (data) => axios.put(`${API}/update`, data);
export const deleteBook = (id) => axios.delete(`${API}/delete/${id}`);
