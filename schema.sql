USE bamazon;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES 
(2, "chicken", "Hot Food", 5, 75),
(3, "Comb", "Hair", 3, 85),
(4, "Chess", "Board Games", 15, 15),
(5, "Rice", "Food", 1, 25),
(6, "Power Ranger", "Toys", 7, 100),
(7, "BBQ Grill", "Cooking", 100, 5),
(8, "Rope", "Car parts", 5, 55),
(9, "TV", "Electonics", 255, 25),
(10, "Radio", "Car parts", 5, 75),
(11, "Oven", "Cooking", 555, 10);

SELECT * FROM products;