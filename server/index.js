const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
let db;
const connectToMongoDB = async () => {
try {
const client = await MongoClient.connect('mongodb://mongodb:27017/', { useUnifiedTopology: true });
console.log('Connected to MongoDB');
db = client.db('mybookdb');
} catch (err) {
console.error("MongoDB Connection Error: ", err);
}
}
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
app.post('/books', (req, res) => {
const book = req.body;
db.collection('books').insertOne(book, (err, result) => {
if (err) {
console.error("Insert Error: ", err);
return res.status(500).send(err);
}
res.status(201).send(result.ops[0]);
});
});
/*app.get('/books', (req, res) => {
   db.collection('books').find({}).toArray((err, books) => {
if (err) {
console.error("Find Error: ", err);
return res.status(500).send(err);
}
res.status(200).send(books);
});
}); 
*/
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

    // Use the query object to filter books
    db.collection('books').find(query).toArray((err, books) => {
        if (err) {
            console.error("Find Error: ", err);
            return res.status(500).send(err);
        }
        res.status(200).send(books);
    });
});

app.put('/books/:id', (req, res) => {
const id = req.params.id;
const updatedBook = req.body;
db.collection('books').updateOne({ _id: new ObjectId(id) }, { $set: updatedBook }, (err, result) => {
if (err) {
console.error("Update Error: ", err);
return res.status(500).send(err);
}
res.status(200).send(result);
});
});
app.delete('/books/:id', (req, res) => {
const id = req.params.id;
db.collection('books').deleteOne({ _id: new ObjectId(id) }, (err, result) => {
if (err) {
console.error("Delete Error: ", err);
return res.status(500).send(err);
}
res.status(200).send(result);
});
});
connectToMongoDB().then(() => {
app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});
});

app.get('/', (req, res) => {
    res.send('Welcome to my book API!');
});

/*
const fs = require('fs'); // Підключення модуля 'fs' для роботи з файловою системою
app.get('/', (req, res) => {
fs.readFile('./my-ebooks-app/index.html', 'utf8', (err, data) => {
   if (err) {
       // Обробка помилок, якщо файл не може бути зчитаний
       console.error(err);
       res.status(500).send('Помилка зчитування файлу index.html');
   } else {
       // Відправка вмісту файлу як відповідь на запит
       res.send(data);
   }
});

});
app.get('/my-ebooks-app/script.js', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
    // Your code to send the script.js file
    fs.readFile('./my-ebooks-app/script.js', 'utf8', (err, data) => {
        if (err) {
            // Обробка помилок, якщо файл не може бути зчитаний
            console.error(err);
            res.status(500).send('Помилка зчитування файлу index.html');
        } else {
            // Відправка вмісту файлу як відповідь на запит
            res.send(data);
        }
     });
  });
  */
