const express = require("express");
const router = express.Router();

const controlador = require("../controllers/compras");

// ==========================
// RUTAS
// ==========================

// Obtener todas las compras
router.get("/", controlador.listarCompras);

// Obtener compras de hoy
router.get("/compras-hoy", controlador.obtenerComprasHoy);

// Obtener una compra por ID
router.get("/:id", controlador.obtenerCompra);

// Crear una compra
router.post("/", controlador.crearCompra);

// Eliminar una compra
router.delete("/:id", controlador.eliminarCompra);

module.exports = router;