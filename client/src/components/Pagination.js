import React from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';

// The Pagination component displays a pagination control for navigating through pages of books.
function Pagination({ totalBooks, booksPerPage, currentPage, handlePageChange }) {
  return (
    // Container for centering the pagination control
    <Box display="flex" justifyContent="center" mt={2}>
      {/* Check if there are books to display */}
      {totalBooks !== 0 ? (
      <MuiPagination
        count={Math.ceil(totalBooks / booksPerPage)} // Calculate the total number of pages
        page={currentPage} // Current active page
        onChange={handlePageChange} // Callback function for page change
        color="primary" // Color style for the pagination control
      />
      ) : (
        // Display an empty div if there are no books
        <div></div>
      )}
    </Box>
  );
}

// Export the Pagination component
export default Pagination;