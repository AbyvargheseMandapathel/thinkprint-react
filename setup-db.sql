-- Create categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    img VARCHAR(255)
);

-- Create subcategories table if it doesn't exist
CREATE TABLE IF NOT EXISTS subcategories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insert sample categories if they don't exist
INSERT IGNORE INTO categories (name, img) VALUES 
('Visiting Cards', '/assets/categories/Visiting-Cards.webp'),
('Personalized Clothing', '/assets/categories/Custom-T-shirts.webp'),
('Custom Stamps & Ink', '/assets/categories/Custom-Stamps-And-Ink.webp'),
('Photo Gifts', '/assets/categories/Photo-Gifts.webp'),
('Labels, Stickers & Packaging', '/assets/categories/Labels-Stickers-Packaging.webp'),
('Custom Stationery', '/assets/categories/Custom-Stationery.webp'),
('Signs, Posters & Marketing Materials', '/assets/categories/Signs-Posters-Marketing-Materials.webp'),
('Custom Caps', '/assets/categories/Custom-Caps.webp'),
('Custom Drinkware', '/assets/categories/Custom-Drinkware.webp'),
('Custom Bags', '/assets/categories/Custom-Bags.webp');

-- Insert sample subcategories if they don't exist
INSERT IGNORE INTO subcategories (category_id, name) VALUES 
(1, 'Standard Cards'),
(1, 'Premium Cards'),
(1, 'Eco-Friendly Cards'),
(1, 'Spot UV Cards'),
(2, 'T-Shirts'),
(2, 'Hoodies'),
(2, 'Jackets'),
(2, 'Sportswear'); 