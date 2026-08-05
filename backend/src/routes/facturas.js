const express = require('express');
const router = express.Router();

const controlador = require('../controllers/facturas');

// ==========================
// RUTAS
// ==========================

// Obtener todas las facturas
router.get('/', controlador.listarFacturas);

// Obtener ventas del día
router.get('/ventas-hoy', controlador.obtenerVentasHoy);

// Obtener ventas de los últimos 7 días
router.get('/ventas-semana', controlador.obtenerVentasSemana);

// Obtener el detalle de una factura
router.get('/:id/detalle', controlador.obtenerDetalleFactura);

// Obtener las últimas 5 facturas
router.get('/ultimas', controlador.obtenerUltimasFacturas);

// Crear una nueva factura
router.post('/', controlador.crearFactura);

// Eliminar una factura
router.delete('/:id', controlador.eliminarFactura);

// Obtener una factura por ID
router.get('/:id', controlador.obtenerFactura);

module.exports = router;