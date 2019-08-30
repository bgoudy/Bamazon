USE bamazon;

CREATE TABLE products (
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY (item_id)
    );
    
    INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
    VALUES (0, "Suspenders", "Clothing", 15, 25);
    
    SELECT * FROM bamazon; 