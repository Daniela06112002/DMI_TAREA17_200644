import express from "express";
import playerRoutes from "./routes/playerRoutes.js"
import dbConnection from "./config/db.js";
import bodyParser from "body-parser";


const api = new express()
const port = 20064

api.use("/player", playerRoutes)

api.use(bodyParser.urlencoded({extend: false}))
api.listen(port, () => {
    console.log(`El api ha sido iniciada y se encuentra escuchando por el puerto: http://localhost:${port}/`)
})


api.use("/players", playerRoutes)
try {
    console.log("STATUS -> INTENTANDO CONECTAR A LA BD")
    dbConnection.authenticate
    console.log("STATUS -> LA CONEXION A LA BD FUE EXITOSA")
    console.log("STATUS -> SINCRONIZANDO LA BD  CON LOS OBJETOS EXISTENTES")
    dbConnection.sync();
    console.log("STATUS -> BD LISTA PAR REALIZAR OPERCACIONES")
} catch (error) {
    console.error("Han ocurrido errores intentando conectarse a la BD")
    console.error(error)
}


