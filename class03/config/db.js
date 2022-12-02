import { Sequelize } from "sequelize";

// mysql query to create user with all privileges
// CREATE USER "myUsername"@"%" IDENTIFIED BY "MySecretPassword";
// GRANT ALL PRIVILEGES ON * . * TO "myUsername"@"%";

const dbInstance = new Sequelize({
  host: "localhost",
  port: 3306,
  username: "myUsername",
  password: "MySecretPassword",
  database: "db_appweb",
  dialect: "mysql",
});

export { dbInstance };
