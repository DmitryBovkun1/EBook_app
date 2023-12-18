import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

// The CreateBook component provides a form for creating a new book.
function CreateBook({ newBook, setNewBook, createBook }) {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {/* Input field for the book title */}
      <Grid item>
        <TextField
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          required
          sx={{ '& input': { fontSize: '16px', padding: '8px' } }}
        />
      </Grid>
      {/* Input field for the book author */}
      <Grid item>
        <TextField
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          required
          sx={{ '& input': { fontSize: '16px', padding: '8px' } }}
        />
      </Grid>
      {/* Button to create a new book */}
      <Grid item>
        <Button variant="contained" color="primary" onClick={createBook}>
          Add Book
        </Button>
      </Grid>
    </Grid>
  );
}

// Export the CreateBook component
export default CreateBook;