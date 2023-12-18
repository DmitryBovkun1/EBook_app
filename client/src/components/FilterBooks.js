import React from 'react';
import Typography from '@mui/material/Typography';

// Styles for the FilterBooks component
const styles = {
    filterContainer: {
        marginBottom: '20px',
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        background: '#f9f9f9',
    },
    inputLabel: {
        textAlign: 'center',
        display: 'block',
        marginBottom: '12px',
        fontWeight: 'bold',
        fontSize:'20px',
    },
    input: {
        display: 'block',
        margin: 'auto',
        width: '80%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        marginBottom: '12px',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontSize:'20px',
    },
};

// The FilterBooks component provides a form for filtering books based on title and author.
function FilterBooks({ filter, setFilter, onFilterChange }) {
    // Handle changes in the filter inputs
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const updatedFilter = { ...filter, [name]: value };
        setFilter(updatedFilter);
        onFilterChange(updatedFilter);
    };

    return (
        <div style={styles.filterContainer}>
            {/* Filter title */}
            <Typography variant="h4" style={{ textAlign:'center', fontFamily: 'Georgia, serif' }}>Filter Books</Typography>
            <form>
                {/* Input for Book Title */}
                <label style={styles.inputLabel}>
                    Book Title
                    <input
                        type="text"
                        name="title"
                        value={filter.title}
                        onChange={handleFilterChange}
                        style={styles.input}
                    />
                </label>
                {/* Input for Book Author */}
                <label style={styles.inputLabel}>
                    Book Author
                    <input
                        type="text"
                        name="author"
                        value={filter.author}
                        onChange={handleFilterChange}
                        style={styles.input}
                    />
                </label>
            </form>
        </div>
    );
}

// Export the FilterBooks component
export default FilterBooks;