USE grocery_helper;

INSERT INTO users (name, email, password)
VALUES
('Chris', 'chris@email.com', 'test123'),
('Alex', 'alex@email.com', 'test456');

INSERT INTO shopping_lists (user_id, title)
VALUES
(1, 'Weekly Groceries'),
(1, 'Dinner Party List'),
(2, 'Quick Walmart Run');

INSERT INTO ingredients (name, category)
VALUES
('Milk', 'Dairy'),
('Eggs', 'Protein'),
('Rice', 'Grains'),
('Tomatoes', 'Vegetables'),
('Chicken Breast', 'Protein'),
('Butter', 'Dairy');

INSERT INTO shopping_items (list_id, item_name, quantity, category, bought)
VALUES
(1, 'Apples', 4, 'Fruit', FALSE),
(1, 'Bread', 1, 'Bakery', FALSE),
(1, 'Orange Juice', 2, 'Drinks', TRUE),
(2, 'Pasta', 2, 'Grains', FALSE),
(2, 'Parmesan Cheese', 1, 'Dairy', FALSE),
(3, 'Toilet Paper', 1, 'Household', FALSE);

INSERT INTO pantry_items (user_id, item_name, quantity, category, expiry_date)
VALUES
(1, 'Salt', 1, 'Seasoning', '2026-12-31'),
(1, 'Pasta Sauce', 2, 'Canned Goods', '2026-09-01'),
(1, 'Cereal', 1, 'Breakfast', '2026-07-10'),
(2, 'Olive Oil', 1, 'Cooking', '2027-01-15');

INSERT INTO list_ingredients (list_id, ingredient_id, quantity)
VALUES
(1, 1, 2),
(1, 2, 12),
(2, 3, 1),
(2, 4, 4),
(2, 5, 2),
(2, 6, 1);