import Sequelize from "sequelize";

// msql query to create user with all privileges
// CREATE USER 'myUsername'@'localhost' IDENTIFIED BY 'MySecretPassword';
// GRANT ALL PRIVILEGES ON * . * TO 'myUsername'@'localhost';
// CREATE USER 'myUsername'@'%' IDENTIFIED BY 'MySecretPassword';
// GRANT ALL PRIVILEGES ON * . * TO 'myUsername'@'%';
// create database appweb;

const dbInstance = new Sequelize({
  host: "localhost",
  port: 3306,
  username: "myUsername",
  password: "MySecretPassword",
  database: "db_appweb",
  dialect: "mysql",
});

export { dbInstance };
