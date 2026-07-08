DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers(
    customer_id INTEGER PRIMARY KEY, 
    customer_name TEXT NOT NULL, 
    city TEXT
); 

CREATE TABLE orders(
    order_id INTEGER PRIMARY KEY, 
    customer_id INTEGER, 
    order_date DATE,
    amount DECIMAL (10,2),
    FOREIGN KEY  (customer_id)
        REFERENCES customers (customer_id)
); 

INSERT INTO customers
VALUES
(1, 'Harry Potter', 'New York'),
(2, 'Ronald Weasley', 'Texas'),
(3, 'Hermione Granger', 'Miami'),
(4, 'Albus Dumbledore', 'Los Angeles'),
(5, 'Severus Snape', 'San Antonio'); 

INSERT INTO orders
VALUES
(101,1,'2026-01-10',124),
(102,2,'2026-01-05',24),
(103,3,'2026-01-11',65),
(104,4,'2026-01-12',411),
(105,5,'2026-01-11',88),
(106,1,'2026-01-10',92),
(107,2,'2026-01-15',120),
(108,3,'2026-01-14',211),
(109,4,'2026-01-12',325),
(110,5,'2026-01-13',121); 

SELECT * FROM customers;

SELECT * FROM orders;

/* 1. inner join */
SELECT c.customer_name, o.order_id, o.amount
FROM customers c
INNER JOIN orders o
ON c.customer_id = o.customer_id;

/* 2. Left JOIN*/
SELECT c.customer_name, o.order_id 
FROM customers c
LEFT JOIN orders o
ON c.customer_id = o.customer_id;

/* 3.  Total gastado por cliente*/
SELECT c.customer_name, SUM(o.amount) as total_spent
FROM customers c
JOIN orders o
ON c.customer_id= o.customer_id
GROUP BY c.customer_name
ORDER BY SUM(o.amount) ASC;

/* 4. Group by + HAVING: clientes que gastaron mas de 200$*/
SELECT c.customer_name, SUM(o.amount) as total_spent
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.customer_name
HAVING SUM(o.amount)>200;

/* 5. Cantidad de Pedidos por cliente*/
SELECT c.customer_name, count(o.order_id) as order_count
FROM customers c 
JOIN orders o
on c.customer_id = o.customer_id
GROUP BY c.customer_name;

/* 6. Subquery: pedidos mayores a promedio*/
SELECT * FROM orders
WHERE amount > 
(
	SELECT AVG (amount)
	FROM orders
);

/* 7. customers con menos de 1 pedido mayor a 300*/

SELECT customer_name FROM customers c
WHERE EXISTS
(
	SELECT 1 FROM orders o
	WHERE o.customer_id = c.customer_id
	And o.amount>250
);
/* 8. Window function - Row number*/
SELECT order_id,customer_id, amount, row_number() OVER
(
	PARTITION BY customer_id
	ORDER BY amount DESC
) as row_num
FROM orders;

/* 9. Window function - RANK*/
SELECT customer_id, amount, rank() OVER
(
	ORDER BY amount DESC
) as raking 
FROM orders;

/* 10. Window function - Running Total*/
SELECT order_id, customer_id,amount, sum(amount) OVER
(
	ORDER BY order_date
)AS running_total
FROM orders;

/* 11. CTE */
WITH CustomerTotals AS 
(
	SELECT customer_id, sum(amount) as total_spent
	FROM orders
	GROUP BY customer_id		
)
SELECT customer_id, total_spent
FROM CustomerTotals
WHERE total_spent>400;