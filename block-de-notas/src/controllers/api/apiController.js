const db = require("../../database/models");
const sequelize = db.sequelize;
//const fs = require('fs');
const path = require('path')
const Op = db.Sequelize.Op

//CON EL PROCESO DEL CRUD SE PUEDE IMPLEMENTAR RESPUESTAS DE TIPO JSON PARA LA CONSTRUCCION DE UNA API PROPIA, INCLUSO SIN VISTAS.
//RETURN DE LA INFORMACION EN FORMATO JSON



//............API DE EVENTOS.................................................................................//


//..................................................LIST......................................................//
const listApi = (req, res) => {

    //prueba 1  
    // res.send('probando el ListApi')
    //prueba 2 
    //return res.json('hola')
    db.Eventos//llamo al Modelo
        .findAll()
        .then(eventos => {//llamo a la tabla eventos
            //return res.json(eventos)//tabla eventos
            //mas organizado Y SE PUEDE ENVIAR LA INFORMACION QUE SE NECESITE:
         
            return res.status(200).json({
                total: eventos.length,
                data: eventos,
                url: '/api/eventos',
                status: 200,
            })
           
        })
        //prueba de envío a vista api//
        .then(()=> {

            res.render('api');
        }


        )

    //JSON permite enviar la info con este formato para ser consumido como API. 
    //RENDER sirve para enviar la info a la vista y el objetivo de la creación de una API no es enviar info a la vista sino crear ENDPOINTS
};
//..................................................DETAIL.....................................................//
const getApiEvento = (req, res) => {

    db.Eventos//llamo al Modelo
        .findByPk(req.params.id_evento)
        .then(evento => {//llamo a la tabla eventos
            //return res.json(eventos)//tabla eventos
            //mas organizado Y SE PUEDE ENVIAR LA INFORMACION QUE SE NECESITE :
            return res.status(200).json({
                data: evento,
                status: 200
            })
        })


    //JSON permite enviar la info con este formato para ser consumido como API. 
    //RENDER sirve para enviar la info a la vista y el objetivo de la creación de una API no es enviar info a la vista sino crear ENDPOINTS
};
//..................................................CREATE-POST................................................//
const postApiEvento = (req, res) => {
    //  return res.json(req.body)//SE PRUEBA CON POSTMAN, UTILIZANDO LOS DATOS OBLIGATORIOS DE LA TABLA QUE COMPONEN EL BODY
    //POSTMAN: Marcar BODY, RAW, JSON, y crear un BODY nuevo, colocar método POST y enviar la petición, en la parte de abajo en respuesta de la consulta.

    db.Eventos//llamo al Modelo
        .create(req.body)//ver cuales son los valores obligatorios en la base de datos que se necesitan enviar
        .then(evento => {//llamo a la tabla eventos
            //return res.json(eventos)//tabla eventos
            //mas organizado Y SE PUEDE ENVIAR LA INFORMACION QUE SE NECESITE :
            return res.status(200).json({
                data: evento,
                status: 200,
                created: "ok"
            })
        })

};
//..................................................DELETE.................................................//
const borrarApiEvento = (req, res) => {
    //  return res.json(req.body)//SE PRUEBA CON POSTMAN, UTILIZANDO LOS DATOS OBLIGATORIOS DE LA TABLA QUE COMPONEN EL BODY
    //POSTMAN: Marcar BODY, RAW, JSON, y crear un BODY nuevo, colocar método POST y enviar la petición, en la parte de abajo en respuesta de la consulta.

    db.Eventos//llamo al Modelo
        .destroy(
            { where: { id_evento: req.params.id_evento } }
        )//se puede eliminar por otro parámetro que no sea el ID. Aclarar esto con un "WHERE"
        .then(response => {//pido la respuesta

            return res.json(response)
        })

    //cuando el metodo DELETE en POSTMAN devuelve "1" es porque la respuesta a la consulta fue satisfactoria
    //JSON permite enviar la info con este formato para ser consumido como API. 
    //RENDER sirve para enviar la info a la vista y el objetivo de la creación de una API no es enviar info a la vista sino crear ENDPOINTS
};
//..................................................SEARCH................................................//
/*
const search = (req, res) => {

    db.Eventos//llamo al Modelo
        .findAll(
           
            { where :{
                titulo: { [Op.like] : '%' + req.query.keyword +'%'}
            } }
        )//o findOne
        .then(eventos => {//llamo a la tabla eventos
           
            return res.status(200).json(eventos)//lo que se envia dentro del JSON es lo que puede necesitar, la info que puede necesitar la persona que consume la API
        })



};
*/
//..................................................EDITAR-PUT................................................//
const putApiEvento = (req, res) => {
    //  return res.json(req.body)//SE PRUEBA CON POSTMAN, UTILIZANDO LOS DATOS OBLIGATORIOS DE LA TABLA QUE COMPONEN EL BODY
    //POSTMAN: Marcar BODY, RAW, JSON, y crear un BODY nuevo, colocar método POST y enviar la petición, en la parte de abajo en respuesta de la consulta.

    db.Eventos//llamo al Modelo
        .update(
            req.body,
            
        {where: { id_evento : req.params.id_evento},
        }
            
            )//ver cuales son los valores obligatorios en la base de datos que se necesitan enviar
        .then(eventos => {//llamo a la tabla eventos
           
            return res.status(200).json(eventos)//lo que se envia dentro del JSON es lo que puede necesitar, la info que puede necesitar la persona que consume la API
        })


};


module.exports = {
    listApi,
    getApiEvento,
    postApiEvento,
    borrarApiEvento,
   // search, 
    putApiEvento
}