const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
//app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost', // Replace with your database host
    user: 'root', // Replace with your database username
    password: '1234', // Replace with your database password
    database: 'bookshop' // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// API Endpoints
// Get all books

app.get('/api/books/:id', (req, res) => {
    const bookId = req.params.id;
    const query = 'SELECT * FROM books WHERE id = ?';
    db.query(query, [bookId], (err, results) => {
        if (err) {
            console.error('Error fetching book details:', err);
            res.status(500).json({ error: 'Failed to fetch book details' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Book not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// Fetch all books
app.get('/api/books', (req, res) => {
    const query = 'SELECT * FROM books';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching books:', err);
            res.status(500).json({ error: 'Failed to fetch books' });
        } else {
            res.json(results);
        }
    });
});

// Add a new book
app.post('/api/books', (req, res) => {
    const { title, author, price, description, photo_url, type } = req.body;
    db.query('INSERT INTO books (title, author, price, description, photo_url, type) VALUES (?, ?, ?, ?, ?,?)',
        [title, author, price, description, photo_url, type],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send('Book added successfully!');
        }
    );
});

// Update a book
app.put('/api/books/:id', (req, res) => {
    const { title, author, price, description, photo_url, type } = req.body;
    const bookId = req.params.id;
    db.query('UPDATE books SET title = ?, author = ?, price = ?, description = ?, photo_url = ?, type = ? WHERE id = ?',
        [title, author, price, description, photo_url, type, bookId],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send('Book updated successfully!');
        }
    );
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
    const bookId = req.params.id;
    db.query('DELETE FROM books WHERE id = ?', [bookId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Book deleted successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
