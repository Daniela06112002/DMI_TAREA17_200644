import sequelize from 'sequelize';
import dotenv from "dotenv";
dotenv.config({path :"src/.env"})

const dbConnection = new sequelize(
    // process.env.DB_NAME,
    // process.env.DB_USER,
    // process.env.DB_PASSWORD,
    "db_videojuego_200644",
    "root",
    "06112002",
    {
        host: "localhost",
        port: 3307,
        dialect:"mysql"
    }
)


export default dbConnection
