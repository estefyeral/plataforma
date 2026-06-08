const express = require('express');
const router = express.Router();

// 👇 LLAMA AL CONTROLADOR QUE TÚ TIENES: usuarios.js (PLURAL)
const controlador = require('../controllers/usuarios');

router.get('/', controlador.listarUsuarios);
router.get('/:id', controlador.obtenerUsuario);
router.post('/', controlador.crearUsuario);
router.put('/:id', controlador.actualizarUsuario);
router.delete('/:id', controlador.eliminarUsuario);

module.exports = router;