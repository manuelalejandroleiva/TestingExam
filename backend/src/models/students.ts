import { DataTypes } from "sequelize";
import db from "../../db/connection";

const students = db.define(
    "students",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        first_name: { type: DataTypes.INTEGER, allowNull: false },
        last_name: { type: DataTypes.TINYINT },
        email: { type: DataTypes.INTEGER },
        age: { type: DataTypes.DECIMAL(10, 2) },
        grade: { type: DataTypes.DECIMAL(10, 2) },
        
        createdAt: { type: DataTypes.DATE },
        updatedAt: { type: DataTypes.DATE },
        deletedAt: { type: DataTypes.DATE, allowNull:true }
    },
    { tableName: "students", timestamps: true, paranoid: true }
);




export default students;