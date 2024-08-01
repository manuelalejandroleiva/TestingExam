import { Sequelize } from "sequelize";
const DB_PORT: any = process.env.DB_PORT ? process.env.DB_PORT : 3306;


const db = new Sequelize(
    process.env.DB || "",
    process.env.DB_USER || "",
    process.env.DB_PASSWORD || "",
    {
        host: process.env.DB_IP || "",
        port: DB_PORT,
        dialect: "mysql",
        logging: false,
        dialectOptions: {
            dateStrings: true,
            typeCast: (field: any, next: any) => {
                if (field.type === "DATETIME") {
                    return new Date(field.string() + "Z");
                }
                return next();
            },
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
        timezone: process.env.TZ || "+00:00",
    }
);

export default db;
