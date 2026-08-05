const express = require("express");
const router = express.Router();

const controlador = require("../controllers/detallecompras");

// ==========================
// OBTENER DETALLE DE UNA COMPRA
// ==========================

router.get("/:id", controlador.obtenerDetalleCompra);

module.exports = router;