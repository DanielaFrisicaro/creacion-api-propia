//llamo a Express y Express.Router
const express= require('express');
const router = express.Router();

//llamo al controlador
const apiController = require ('../../controllers/api/apiController')

//rutas

router.get('/', apiController.listApi)//LIST//no hay que colocarle '/api/eventos' ya que ya se especificó en app.js que cuando se llame a '/api/eventos' va a llevarte a el "home de eventos API" por lo que llamando solo con '/' accede
router.get('/:id_evento', apiController.getApiEvento)//DETAIL
router.post('/', apiController.postApiEvento)//CREATE-POST
router.delete('/:id_evento/editar', apiController.borrarApiEvento)//DELETE(EDITAR-DELETE)
//router.get('/search', apiController.search)//BUSCADOR.
router.put('/:id_evento/editar', apiController.putApiEvento);//EDITAR-PUT

//exportar router
module.exports = router