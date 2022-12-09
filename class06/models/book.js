import Sequelize from "sequelize";
import {
    dbInstance
} from "../config/db.js";

export const BookModel = dbInstance.define(
    "book" /*isto é o nome da tabela da base de dados*/ , {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
        author: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        release: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
        subject: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            },
        }
    }
);