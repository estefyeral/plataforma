const express = require('express');
const router = express.Router();
const controlador = require('../controllers/facturas');

router.get('/', controlador.listar);
router.post('/', controlador.crear);

module.exports = router;