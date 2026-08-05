const modelo = require("../models/compras");

// ==========================
// LISTAR COMPRAS
// ==========================

const listarCompras = async (req, res) => {

  try {

    const datos = await modelo.obtenerTodas();

    res.json(datos);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

// ==========================
// OBTENER COMPRA
// ==========================

const obtenerCompra = async (req, res) => {

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
// CREAR COMPRA
// ==========================

const crearCompra = async (req, res) => {

  try {

    const id = await modelo.crear(req.body);

    res.json({

      mensaje: "Compra registrada correctamente",

      id_compra: id

    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

// ==========================
// OBTENER COMPRAS DE HOY
// ==========================

const obtenerComprasHoy = async (req, res) => {

  try {

    const datos = await modelo.obtenerComprasHoy();

    res.json(datos);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

// ==========================
// ELIMINAR COMPRA
// ==========================

const eliminarCompra = async (req, res) => {

  try {

    await modelo.eliminar(req.params.id);

    res.json({

      mensaje: "Compra eliminada correctamente"

    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

module.exports = {

  listarCompras,
  obtenerCompra,
  obtenerComprasHoy,
  crearCompra,
  eliminarCompra

};