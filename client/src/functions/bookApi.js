const apiUrl = 'http://localhost:3001';

// Function to fetch books from the server based on pagination and filtering criteria
export const readBooks = (currentPage, booksPerPage, filter, setBooks, setTotalBooks) => {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;

    const queryParams = new URLSearchParams(filter).toString();
    const url = `${apiUrl}/books${queryParams ? `?${queryParams}` : ''}`;

    // Fetch books from the server
    return fetch(url, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        // Update state with the fetched books and total book count
        setBooks(data.slice(startIndex, endIndex));
        setTotalBooks(data.length);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

// Function to create a new book on the server
export const createBook = (newBook, readBooks) => {
    // Validate new book data
    if (!newBook.title.trim() || !newBook.author.trim()) {
        alert('Error: Title and author cannot be empty');
        return;
    }

    // Create a new book on the server
    return fetch(`${apiUrl}/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newBook.title, author: newBook.author }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Refresh the book list after creating a new book
        readBooks();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

// Function to delete a book on the server
export const deleteBook = (bookId, books, totalBooks, currentPage, setCurrentPage, booksPerPage, readBooks) => {
    console.log(`Delete book with id ${bookId}`);
    fetch(`${apiUrl}/books/${bookId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Book deleted successfully:', data);

        // Update pagination after deleting a book
        const newTotalBooks = totalBooks - 1;
        const lastItemIndex = (currentPage - 1) * booksPerPage + books.length;

        if (lastItemIndex >= newTotalBooks) {
            const newLastPage = Math.ceil(newTotalBooks / booksPerPage);
            setCurrentPage(newLastPage > 0 ? newLastPage : 1);
        }
        // Refresh the book list after deleting a book
        readBooks();
    })
    .catch((error) => {
        console.error('Error deleting book:', error.message);
    });
};

// Function to update a book on the server
export const updateBook = (bookId, editingBooks, setBooks) => {
    const editingBook = editingBooks[bookId];
    const { title, author } = editingBook;

    // Validate updated book data
    if (!editingBook.title.trim() || !editingBook.author.trim()) {
        alert('Error: Title and author cannot be empty');
        return;
    }

    console.log(`Update book with id ${bookId}`);
    // Update the book on the server
    fetch(`${apiUrl}/books/${bookId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Book updated successfully:', data);
        // Update state with the edited book
        setBooks(prevBooks =>
            prevBooks.map(book => (book._id === bookId ? { ...book, ...editingBook } : book))
        );
    })
    .catch((error) => {
        console.error('Error updating book:', error.message);
    });
};
