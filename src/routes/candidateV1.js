const express = require('express'); //exportamos express 
const candidateController = require('../controllers/candidate'); // importamos controlador de candidatos
const errorHandler = require('../middlewares/errorHandler');

const router = express.Router(); //creamos rutas de express

router.get('/', candidateController.getAll);
router.get('/:id', candidateController.getById); //definimos get obtener un candidato por su id
router.post('/', candidateController.create);
router.put('/:id', candidateController.update);
router.delete('/:id', candidateController.remove);


module.exports = router; //exportamos appjs
