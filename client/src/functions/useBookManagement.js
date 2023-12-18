import { useEffect, useState } from 'react';
import * as actions from './bookApi';
 
// Custom hook for managing book-related state and actions
function useBookManagement() {
  // State variables for managing books and related data
  const [books, setBooks] = useState([]);
  const [editingBooks, setEditingBooks] = useState({});
  const [editWindows, setEditWindows] = useState({});
  const [filter, setFilter] = useState({ author: '', title: '' });
  const [totalBooks, setTotalBooks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
 
  // Effect to fetch books from the server based on pagination and filtering
  useEffect(() => {
    actions.readBooks(currentPage, booksPerPage, filter, setBooks, setTotalBooks);
  }, [currentPage, filter, booksPerPage]);

  // Function to create a new book
  const createBook = (newBook) => {
    actions.createBook(newBook, readBooks);
  };

  // Function to delete a book
  const deleteBook = (bookId) => {
    actions.deleteBook(bookId, books, totalBooks, currentPage, setCurrentPage, booksPerPage, readBooks);
  };

  // Function to update a book
  const updateBook = (bookId) => {
    actions.updateBook(bookId, editingBooks, setBooks);
  };

  // Function to re-fetch books based on current filters and pagination
  const readBooks = () => {
    actions.readBooks(currentPage, booksPerPage, filter, setBooks, setTotalBooks);
  };

  // Function to handle changes in filter criteria
  const handleFilterChange = (updatedFilter) => {
    setFilter(updatedFilter);
    readBooks();
    setCurrentPage(1);
  };

  // Function to toggle the edit window for a specific book
  const toggleEditWindow = (bookId) => {
    setEditWindows((prevEditWindows) => ({
      ...prevEditWindows,
      [bookId]: !prevEditWindows[bookId],
    }));
  };

  // Function to initiate editing of a book
  const editBook = (bookId) => {
    const bookToEdit = books.find((book) => book._id === bookId);
    if (bookToEdit) {
      setEditingBooks((prevEditingBooks) => ({
        ...prevEditingBooks,
        [bookId]: { title: bookToEdit.title, author: bookToEdit.author },
      }));
      toggleEditWindow(bookToEdit._id);
    } else {
      console.error(`Book with id ${bookId} not found`);
    }
  };

  // Function to handle page changes in pagination
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Function to calculate the display index for a book in the current page
  const calculateIndex = (originalIndex) => {
    return (currentPage - 1) * booksPerPage + originalIndex + 1;
  };

  // Return the state variables and functions for external usage
  return {
    books,
    readBooks,
    newBook, 
    setNewBook,
    editingBooks,
    setEditingBooks,
    editWindows,
    filter,
    setFilter,
    totalBooks,
    currentPage,
    booksPerPage,
    createBook,
    deleteBook,
    updateBook,
    editBook,
    handleFilterChange,
    toggleEditWindow,
    handlePageChange,
    calculateIndex,
  };
}

// Export the useBookManagement custom hook
export default useBookManagement;