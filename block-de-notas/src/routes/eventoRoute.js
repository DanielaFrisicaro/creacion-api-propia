const express= require('express');
const router = express.Router();

const eventoController = require ('../controllers/eventoController')

router.get('/:id_evento/detalle', eventoController.getEvento),//DETAIL
router.get('/', eventoController.listEvento)//LIST//no hay que colocarle '/eventos' ya que ya se especificó en app.js que cuando se llame a '/eventos' va a llevarte a el "home de eventos" por lo que llamando solo con '/' accede
router.get('/nuevo', eventoController.register);//CREATE-GET
router.post('/nuevo', eventoController.postEvento);//CREATE-POST
router.get('/:id_evento/editar', eventoController.editarEvento);//EDITAR-GET//primero se prueba con get
router.put('/:id_evento/editar', eventoController.putEvento);//EDITAR-PUT
router.delete('/:id_evento/editar', eventoController.borrarEvento)//DELETE(EDITAR-DELETE)

module.exports = router