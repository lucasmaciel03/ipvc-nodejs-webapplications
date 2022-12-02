import { Sequelize } from "sequelize";
import { dbInstance } from "../config/db.js";

const UserModel = dbInstance.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}
);

export { UserModel };
