CREATE DATABASE bookshop;

USE bookshop;

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    price DECIMAL(10,2),
    description TEXT,
    photo_url VARCHAR(255),
    value VARCHAR(255)
);

INSERT INTO books (title, author, price, description, photo_url) 
VALUES 
('Book Title 1', 'Author 1', 19.99, 'Description of Book 1', 'image/book1.jpg'),
('Book Title 2', 'Author 2', 25.99, 'Description of Book 2', 'image/book2.jpg');

