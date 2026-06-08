const express = require('express');
const router = express.Router();

// ✅ LLAMA AL ARCHIVO CORRECTO (PLURAL)
const controlador = require('../controllers/proveedores');

// ✅ NOMBRES EXACTOS DE LAS FUNCIONES
router.get('/', controlador.listar);
router.get('/:id', controlador.uno);
router.post('/', controlador.crear);
router.put('/:id', controlador.actualizar);
router.delete('/:id', controlador.eliminar);

module.exports = router;