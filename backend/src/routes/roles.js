const express = require('express');
const router = express.Router();
const controlador = require('../controllers/roles'); // ✅ coincide con tu archivo

router.get('/', controlador.listar);
router.get('/:id', controlador.uno);
router.post('/', controlador.crear);
router.put('/:id', controlador.actualizar);
router.delete('/:id', controlador.eliminar);

module.exports = router;