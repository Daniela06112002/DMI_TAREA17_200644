import { DataTypes } from "sequelize";
import dbConnection from "../config/db.js";

const Player = dbConnection.define ("tbb_players",
{
    name:{
        type:DataTypes.STRING(255),
        allowNull: false
    },
    email:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique:true
    },
    password:{
        type: DataTypes.STRING(255),
        allowNull:false,
    },
    nickname:{
        type: DataTypes.STRING(255),
        allowNull:false,
        unique:true,
    },
    birthdate:{
        type: DataTypes.DATE,
        allowNull:false,
    },
    Portrait_img:DataTypes.STRING(255),
})


export default Player