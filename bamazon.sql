DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  dept_name VARCHAR(30) NULL,
  price DECIMAL (10,2),
  stock_quantity INTEGER (10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Vansky 3-in-1 Universal Phone Holder", "Electronics", 9.99, 100);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Beam Smartphone Car Air Vent","Electronics", 8.99, 50);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("VaVa Magnetic Phone Holder", "Electronics", 16.99, 10);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Pet Hair Remover Glove", "Pets", 8.69, 2);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Trusty Paw Pet Grooming Gloves", "Pets", 10.65, 1);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Self Cleaning Slicker Brush", "Pets", 15.99, 25);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Peassa Sleeveless Casual Dress", "Women", 14.99, 6);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Svaliy Off Shoulder Tunic", "Women", 8.99, 2);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Rbwinner Maxi Dress", "Women", 18.99, 0);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("BNUS Polarized Shades", "Men", 57.99, 130);