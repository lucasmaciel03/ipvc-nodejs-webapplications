import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";

export const TodoModel = dbInstance.define(
  "todos" /*isto é o nome da tabela da base de dados*/,
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate:{
        notEmpty: true
      },
    },
    done: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }
);

