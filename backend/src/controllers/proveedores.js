const modelo = require("../models/proveedores");

// ==========================
// LISTAR PROVEEDORES
// ==========================

const listarProveedores = async (req, res) => {
  try {
    const datos = await modelo.obtenerTodos();
    res.json(datos);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// ==========================
// OBTENER PROVEEDOR
// ==========================

const obtenerProveedor = async (req, res) => {
  try {
    const dato = await modelo.obtenerPorId(req.params.id);
    res.json(dato);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// ==========================
// CREAR PROVEEDOR
// ==========================

const crearProveedor = async (req, res) => {
  try {
    const id = await modelo.crear(req.body);

    res.json({
      mensaje: "Proveedor creado correctamente",
      id_proveedor: id
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// ==========================
// ACTUALIZAR PROVEEDOR
// ==========================

const actualizarProveedor = async (req, res) => {
  try {

    await modelo.actualizar(req.params.id, req.body);

    res.json({
      mensaje: "Proveedor actualizado correctamente"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// ==========================
// ELIMINAR PROVEEDOR
// ==========================

const eliminarProveedor = async (req, res) => {
  try {

    await modelo.eliminar(req.params.id);

    res.json({
      mensaje: "Proveedor eliminado correctamente"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  listarProveedores,
  obtenerProveedor,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
};