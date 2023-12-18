// Import necessary modules
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

// Create an Express application
const app = express();

// Set the port for the server to listen on
const port = 3001;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Enable JSON parsing for incoming requests
app.use(express.json());

// Initialize a variable to hold the MongoDB connection
let db;

// Function to connect to MongoDB
const connectToMongoDB = async () => {
    try {
        // Connect to MongoDB server
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017/', { useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        // Set the 'db' variable to the database
        db = client.db('mybookdb');
    } catch (err) {
        console.error("MongoDB Connection Error: ", err);
    }
}

// Middleware function to handle CORS (Cross-Origin Resource Sharing) headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Endpoint to handle POST requests to add a book
app.post('/books', (req, res) => {
    const book = req.body;
    // Insert the book into the 'books' collection
    db.collection('books').insertOne(book, (err, result) => {
        if (err) {
            console.error("Insert Error: ", err);
            return res.status(500).send(err);
        }
        // Send the newly inserted book as a response
        res.status(201).send(result.ops[0]);
    });
});

// Endpoint to handle GET requests to retrieve books based on author and title
app.get('/books', (req, res) => {
    const { author, title } = req.query;

    // Build a query object based on the provided parameters
    const query = {};

    if (author) {
        query.author = { $regex: new RegExp(author, 'i') };
    }

    if (title) {
        query.title = { $regex: new RegExp(title, 'i') };
    }

    // Use the query object to filter books and send the result as a response
    db.collection('books').find(query).toArray((err, books) => {
        if (err) {
            console.error("Find Error: ", err);
            return res.status(500).send(err);
        }
        res.status(200).send(books);
    });
});

// Endpoint to handle PUT requests to update a book
app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const updatedBook = req.body;
    // Update the book with the specified ID in the 'books' collection
    db.collection('books').updateOne({ _id: new ObjectId(id) }, { $set: updatedBook }, (err, result) => {
        if (err) {
            console.error("Update Error: ", err);
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
});

// Endpoint to handle DELETE requests to delete a book
app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    // Delete the book with the specified ID from the 'books' collection
    db.collection('books').deleteOne({ _id: new ObjectId(id) }, (err, result) => {
        if (err) {
            console.error("Delete Error: ", err);
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
});

// Connect to MongoDB and start the server
connectToMongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});

// Endpoint to handle GET requests to the root URL
app.get('/', (req, res) => {
    res.send('Welcome to my book API!');
});
