const express = require('express');
const router = express.Router();

const controlador = require('../controllers/clientes');

router.get('/', controlador.listarClientes);
router.get('/:id', controlador.obtenerCliente);
router.post('/', controlador.crearCliente);
router.put('/:id', controlador.actualizarCliente);
router.delete('/:id', controlador.eliminarCliente);

module.exports = router;