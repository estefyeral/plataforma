const modelo = require('../models/facturas');

// ==========================
// LISTAR FACTURAS
// ==========================

const listarFacturas = async (req, res) => {
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
// OBTENER FACTURA POR ID
// ==========================

const obtenerFactura = async (req, res) => {
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
// OBTENER DETALLE FACTURA
// ==========================

const obtenerDetalleFactura = async (req, res) => {
  try {
    const datos = await modelo.obtenerDetalle(req.params.id);

    console.log(datos);
    res.json(datos);
  } catch (error) {
    
    res.status(500).json({
      error: error.message
    });
  }
};

// ==========================
// OBTENER VENTAS DE HOY
// ==========================

const obtenerVentasHoy = async (req, res) => {

  try {

    const datos = await modelo.obtenerVentasHoy();

    res.json(datos);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};
// ==========================
// CREAR FACTURA
// ==========================

const crearFactura = async (req, res) => {
  try {
    const id = await modelo.crear(req.body);

    res.json({
      mensaje: "Factura creada correctamente",
      id_factura: id
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// ==========================
// ELIMINAR FACTURA
// ==========================

const eliminarFactura = async (req, res) => {
  try {

    await modelo.eliminar(req.params.id);

    res.json({
      mensaje: "Factura eliminada correctamente"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// ==========================
// VENTAS ÚLTIMOS 7 DÍAS
// ==========================

const obtenerVentasSemana = async (req, res) => {

  try {

    const datos = await modelo.obtenerVentasSemana();

    res.json(datos);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

// ==========================
// ÚLTIMAS FACTURAS
// ==========================

const obtenerUltimasFacturas = async (req, res) => {

  try {

    const datos = await modelo.obtenerUltimasFacturas();

    res.json(datos);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

module.exports = {
  listarFacturas,
  obtenerFactura,
  obtenerDetalleFactura,
  obtenerVentasHoy,
  obtenerVentasSemana,
  obtenerUltimasFacturas,
  crearFactura,
  eliminarFactura
};