import Player from "../model/Player.js";

const createPlayer = async (rq, rs) =>{
    console.log("Se ha solicitado la creacion de un nuevo jugador");
    const{id, name, email, nickname, birthdate} = rq.body;
    console.log(rq.body)
    const newPlayer = await Player.create(rq.body);
    if(newPlayer){
        rs.status(200);
        rs.json(`Se ha solicitado crear un usuario con el Nombre ${name}, Email ${email}, Apodo ${nickname}, Fecha de Nacimiento${birthdate},`)
    } else{
        rs.status(400);
        rs.json({
            messageStatus: `Se ha solicitado buscar a todos los usuarios`
        });
    }
}

const findAll = async (rq, rs) =>{
    console.log(`Se ha solicitado buscar a todos los usuarios`);
    const allPlayers = await Player.findAll();
    console.log(allPlayers);

    if(allPlayers === null){
        rs.json({
            messageStatus: `No hay Jugadores registrados`,
        });
    } else{
        rs.status(200);
        rs.json(allPlayers);
    }
}

const findPlayerbyID = async (rq, rs) =>{
    const playerID = rq.params.playerID
    console.log(`Se ha solicitado la busqueda de un jugador: ${playerID}`);

    const playerFound = await Player.findByPk(playerID)
    
    /*if(!playerFound === null){
        rs.status(400);
        rs.send(`El jugador con ID: ${playerID}, no se encuentra en la base.`)
    } else{
        rs.status(200)
        rs.json(playerFound)
    }*/

    if(playerFound === null){
        rs.status(400);
        rs.json({
            messageStatus: `El jugador con ID: ${playerID}, no se encuentra en la BD`,
        });
    } else{
        rs.status(200)
        rs.json(playerFound)
    }
}

const findPlayerbyEmail = async (rq, rs) =>{
    /*const playerEmail = rq.params.playerEmail
    console.log(`se ha solicitado buscar a un jugador con correo: ${playerEmail}`);
    rs.status(200);
    rs.send(`se ha solicitado buscar a un jugador con correo: ${playerEmail}`)*/

    const playerEmail =  rq.params.email
    console.log(`Se ha solicitado la busqueda de un jugador: ${playerEmail}`);
    const playerFound = await Player.findOne({where: {email: playerEmail}})
    
    /*if(!playerFound === null){
        rs.status(400);
        rs.send(`El jugador con ID: ${playerID}, no se encuentra en la base.`)
    } else{
        rs.status(200)
        rs.json(playerFound)
    }*/

    if(playerFound === null){
        rs.status(400);
        rs.json({
            messageStatus: `El jugador con email: ${playerEmail}, no se encuentra en la BD`,
        });
    } else{
        rs.status(200)
        rs.json(playerFound)
    }

};

const updatePlayer = async (rq, rs) =>{
    /*const playerID = rq.params.playerID
    console.log(`Se ha solicitado actuallizar un jugador: ${playerID}`);
    rs.status(200);
    rs.send(`Se ha solicitado actuallizar un jugador: ${playerID}`)*/
    const id = rq.params.playerID
    const {name,email,password,nickname,birthdate,portrait_img} = rq.body;
    const findPlayer = await Player.findByPk(id)
    
    if(!findPlayer){
        return rs.status(404).json({ error: "Id no encontrado o incorrecto" });
    } else {
        const Update = await findPlayer.update({
            name,
            email,
            password,
            nickname,
            birthdate,
            portrait_img,
        });
        return rs.status(200).json({ message: `Player actualizado exitosamente con id : ${id}` });
    }

}



const deletePlayer = async (rq, rs) =>{
    /*const playerID = rq.params.playerID
    console.log(`Se ha solicitado borrar un jugador: ${playerID}`);
    rs.status(200);
    rs.send(`Se ha solicitado borrar un jugador: ${playerID}`)*/

    const playerID = rq.params.playerID;
        console.log(`Se ha solicitado la eliminación del jugador con ID: ${playerID}`);

        const deletedPlayerCount = await Player.destroy({
            where: {
                id: playerID
            }
        });

        if (deletedPlayerCount === 1) {
            rs.status(200).json({
                message: `Se ha eliminado el jugador con ID: ${playerID}`
            });
        } else {
            rs.status(404).json({
                message: `El jugador con ID: ${playerID} no fue encontrado en la base de datos.`
            });
        }



}
const changePlayerPortrait = (rq, rs) =>{
    const playerID = rq.params.playerID
    console.log(`Se ha solicitad el cambio: ${playerID}`);
    rs.status(200);
    rs.send(`Se ha solicitad el cambio: ${playerID}`)
}

export {
    createPlayer,
    findAll, 
    findPlayerbyID, 
    findPlayerbyEmail, 
    updatePlayer, 
    deletePlayer, 
    changePlayerPortrait
}