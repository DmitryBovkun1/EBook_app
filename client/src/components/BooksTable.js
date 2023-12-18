import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateBook from './UpdateBook';

// The BooksTable component displays a table of books with options to edit and delete each book.
function BooksTable({
  books,
  calculateIndex,
  editBook,
  deleteBook,
  editWindows,
  editingBooks,
  setEditingBooks,
  updateBook,
  toggleEditWindow,
}) {
  return (
    <TableContainer>
      {books.length > 0 ? ( // Check if there are books to display
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '5%' }}>№</TableCell>
            <TableCell style={{ width: '30%' }}>Book Title</TableCell>
            <TableCell style={{ width: '25%' }}>Book Author</TableCell>
            <TableCell style={{ width: '10%' }}>Edit</TableCell>
            <TableCell style={{ width: '10%' }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book, index) => (
            <React.Fragment key={book._id}>
              {/* Display a row for each book */}
              <TableRow>
                <TableCell>{calculateIndex(index)}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  {/* Edit button */}
                  <IconButton color="primary" onClick={() => editBook(book._id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {/* Delete button */}
                  <IconButton color="secondary" onClick={() => deleteBook(book._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>

              {/* Display the UpdateBook component when editing is enabled for the book */}
              {editWindows[book._id] && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <UpdateBook
                      book={book}
                      editingBooks={editingBooks}
                      setEditingBooks={setEditingBooks}
                      updateBook={updateBook}
                      toggleEditWindow={toggleEditWindow}
                      calculateIndex={calculateIndex(index)}
                    />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      ) : (
        // Display a message when there are no books to show
        <Box textAlign="center" style={{ margin: '12%' }}> <Typography variant="h3">The list of books is empty or no results found for the filter!</Typography> </Box>
      )}
    </TableContainer>
  );
}

// Export the BooksTable component
export default BooksTable;