const modelo = require("../models/productos");

// ==========================
// LISTAR TODOS
// ==========================

const listar = async (req, res) => {

  try {

    const datos = await modelo.obtenerTodos();
    res.json(datos);

  } catch (e) {

    console.error("ERROR AL LISTAR PRODUCTOS:");
    console.error(e);

    res.status(500).json({
      error: e.message
    });

  }

};

// ==========================
// OBTENER UNO
// ==========================

const uno = async (req, res) => {

  try {

    const dato = await modelo.obtenerPorId(req.params.id);
    res.json(dato);

  } catch (e) {

    console.error("ERROR AL OBTENER PRODUCTO:");
    console.error(e);

    res.status(500).json({
      error: e.message
    });

  }

};

// ==========================
// OBTENER STOCK BAJO
// ==========================

const obtenerStockBajo = async (req, res) => {

  try {

    const datos = await modelo.obtenerStockBajo();

    res.json(datos);

  } catch (e) {

    console.error("ERROR AL OBTENER STOCK BAJO:");
    console.error(e);

    res.status(500).json({
      error: e.message
    });

  }

};

// ==========================
// CREAR
// ==========================

const crear = async (req, res) => {

  try {

    const resultado = await modelo.crear(req.body);

    res.json(resultado);

  } catch (e) {

    console.error("ERROR AL CREAR PRODUCTO:");
    console.error(e);

    res.status(500).json({
      error: e.message
    });

  }

};

// ==========================
// ACTUALIZAR
// ==========================

const actualizar = async (req, res) => {

  try {

    const resultado = await modelo.actualizar(
      req.params.id,
      req.body
    );

    res.json(resultado);

  } catch (e) {

    console.error("ERROR AL ACTUALIZAR PRODUCTO:");
    console.error(e);

    res.status(500).json({
      error: e.message
    });

  }

};

// ==========================
// ELIMINAR
// ==========================

const eliminar = async (req, res) => {

  try {

    await modelo.eliminar(req.params.id);

    res.json({
      mensaje: "Eliminado"
    });

  } catch (e) {

    console.error("ERROR AL ELIMINAR PRODUCTO:");
    console.error(e);

    res.status(500).json({
      error: e.message
    });

  }

};

module.exports = {

  listar,
  uno,
  obtenerStockBajo,
  crear,
  actualizar,
  eliminar

};