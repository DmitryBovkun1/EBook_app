import React from 'react';
import { Typography, TextField, Button } from '@mui/material';

// Style for centering elements
const centerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

// The UpdateBook component provides a form for updating book details.
function UpdateBook({ book, editingBooks, setEditingBooks, updateBook, toggleEditWindow, calculateIndex }) {
  return (
    // Container for centering elements
    <div style={centerStyle}>
      {/* Display the title for the book being edited */}
      <Typography variant="h4" textAlign="center">{`Edit Book №${calculateIndex}`}</Typography>
      {/* Input for editing the book title */}
      <label>Title:</label>
      <TextField
        type="text"
        value={editingBooks[book._id].title}
        onChange={(e) =>
          setEditingBooks((prevEditingBooks) => ({
            ...prevEditingBooks,
            [book._id]: {
              ...prevEditingBooks[book._id],
              title: e.target.value,
            },
          }))
        }
      />
      {/* Input for editing the book author */}
      <label>Author:</label>
      <TextField
        type="text"
        value={editingBooks[book._id].author}
        onChange={(e) =>
          setEditingBooks((prevEditingBooks) => ({
            ...prevEditingBooks,
            [book._id]: {
              ...prevEditingBooks[book._id],
              author: e.target.value,
            },
          }))
        }
      />
      {/* Button to save changes */}
      <Button onClick={() => updateBook(book._id)}>Save Changes</Button>
      {/* Button to cancel and close the edit window */}
      <Button onClick={() => toggleEditWindow(book._id)}>Cancel</Button>
    </div>
  );
}

// Export the UpdateBook component
export default UpdateBook;
