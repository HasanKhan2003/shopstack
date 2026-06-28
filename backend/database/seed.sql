---------------------------------------------------
-- Categories
---------------------------------------------------

INSERT INTO categories (name) VALUES
('Electronics'),
('Books'),
('Shoes'),
('Clothing');

---------------------------------------------------
-- Electronics
---------------------------------------------------

INSERT INTO products (name, description, price, image, category_id)
VALUES
('Apple iPhone', 'Latest Apple smartphone.', 999.99, 'images/electronics/iphone.jpg', 1),

('Samsung Galaxy', 'Android flagship smartphone.', 849.99, 'images/electronics/samsung-phone.jpg', 1),

('Infinix Note', 'Affordable Android smartphone.', 249.99, 'images/electronics/infinix-phone.jpg', 1),

('Wireless Headphones', 'Noise cancelling headphones.', 149.99, 'images/electronics/headphone.jpg', 1),

('Wireless Earbuds', 'Bluetooth earbuds.', 89.99, 'images/electronics/airbud.jpg', 1);

---------------------------------------------------
-- Books
---------------------------------------------------

INSERT INTO products (name, description, price, image, category_id)
VALUES
('Book One', 'Interesting fiction book.', 19.99, 'images/books/book1.jpg', 2),

('Book Two', 'Modern programming concepts.', 24.99, 'images/books/book2.jpg', 2),

('Book Three', 'Learn web development.', 29.99, 'images/books/book3.jpg', 2),

('Book Four', 'Artificial Intelligence basics.', 34.99, 'images/books/book4.jpg', 2),

('Book Five', 'Machine Learning guide.', 39.99, 'images/books/book5.jpg', 2);

---------------------------------------------------
-- Shoes
---------------------------------------------------

INSERT INTO products (name, description, price, image, category_id)
VALUES
('Black Shoes', 'Comfortable running shoes.', 59.99, 'images/shoes/black-shoes.jpg', 3),

('Orange Shoes', 'Sports shoes.', 64.99, 'images/shoes/orange-shoes.jpg', 3),

('Pink Shoes', 'casual shoes for women.', 69.99, 'images/shoes/pink-shoes.jpg', 3),

('Red Shoes', 'Stylish sneakers.', 74.99, 'images/shoes/red-shoes.jpg', 3),

('White Shoes', 'Classic everyday shoes.', 79.99, 'images/shoes/white-shoes.jpg', 3);

---------------------------------------------------
-- Clothing
---------------------------------------------------

INSERT INTO products (name, description, price, image, category_id)
VALUES
('Black Jeans', 'Slim fit jeans.', 49.99, 'images/clothing/black-jeans.jpg', 4),

('Blue Jeans', 'Regular fit denim.', 54.99, 'images/clothing/blue-jeans.jpg', 4),

('Black T-Shirt', '100% cotton t-shirt.', 19.99, 'images/clothing/black-t-shirt.jpg', 4),

('White T-Shirt', 'Comfortable everyday wear.', 19.99, 'images/clothing/white-t-shirt.jpg', 4),

('Formal White Shirt', 'Formal office shirt.', 39.99, 'images/clothing/formal-white-shirt.jpg', 4);
