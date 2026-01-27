CREATE USER 'creduser'@'localhost' IDENTIFIED BY 'creduser';
GRANT ALL PRIVILEGES ON *.* TO 'creduser'@'localhost';
FLUSH PRIVILEGES;

SHOW GRANTS FOR 'creduser'@'localhost';