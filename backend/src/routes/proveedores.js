const express = require("express");
const router = express.Router();

const controlador = require("../controllers/proveedores");

// ==========================
// RUTAS
// ==========================

// Obtener todos los proveedores
router.get("/", controlador.listarProveedores);

// Obtener un proveedor por ID
router.get("/:id", controlador.obtenerProveedor);

// Crear proveedor
router.post("/", controlador.crearProveedor);

// Actualizar proveedor
router.put("/:id", controlador.actualizarProveedor);

// Eliminar proveedor
router.delete("/:id", controlador.eliminarProveedor);

module.exports = router;