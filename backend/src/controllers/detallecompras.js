const modelo = require("../models/detallecompras");

// ==========================
// OBTENER DETALLE DE UNA COMPRA
// ==========================

const obtenerDetalleCompra = async (req, res) => {

  try {

    const datos = await modelo.obtenerPorCompra(req.params.id);

    res.json(datos);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

};

module.exports = {
  obtenerDetalleCompra
};