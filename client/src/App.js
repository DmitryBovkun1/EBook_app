import React from 'react';
import Header from './components/Header';
import FilterBooks from './components/FilterBooks';
import CreateBook from './components/CreateBook';
import BooksTable from './components/BooksTable';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import BackToStartButton from './components/BackToStartButton';
import useBookManagement from './functions/useBookManagement';

function App() {
    // Destructuring values from the custom hook
    const {
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
      } = useBookManagement();
    
    // State for managing the current screen ('start' or 'main')
    const [currentScreen, setCurrentScreen] = React.useState('start');

    // Function to switch to the main page
    const switchToMainPage = () => {
        setCurrentScreen('main');
    };

    // Function to switch to the start page
    const switchToStartPage = () => {
        setCurrentScreen('start');
    };

    return (
    <div>
        {/* Conditional rendering based on the current screen */}
        {currentScreen === 'start' && <Header onButtonClick={switchToMainPage}/>}
        {currentScreen === 'main' &&
        <div>
            {/* Components for main page */}
            <FilterBooks filter={filter} setFilter={setFilter} onFilterChange={handleFilterChange} />
            <CreateBook newBook={newBook} setNewBook={setNewBook} createBook={() => createBook(newBook, readBooks)} />
            <BooksTable
            books={books}
            calculateIndex={calculateIndex}
            editBook={editBook}
            deleteBook={deleteBook}
            editWindows={editWindows}
            editingBooks={editingBooks}
            setEditingBooks={setEditingBooks}
            updateBook={updateBook}
            toggleEditWindow={toggleEditWindow}
            />
            <Pagination
                totalBooks={totalBooks}
                booksPerPage={booksPerPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
            <Footer />
            <BackToStartButton onButtonClick={switchToStartPage}/>
        </div>
        }
    </div>
    )
}

export default App;