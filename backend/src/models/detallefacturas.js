const pool = require("../config/db");

// ===================================
// GUARDAR DETALLE DE FACTURA
// ===================================

const crear = async (datos) => {

  const {
    id_factura,
    id_producto,
    cantidad,
    precio,
    subtotal
  } = datos;

  const [resultado] = await pool.query(

    `INSERT INTO detalle_factura
    (
      id_factura,
      id_producto,
      cantidad,
      precio,
      subtotal
    )
    VALUES (?,?,?,?,?)`,

    [
      id_factura,
      id_producto,
      cantidad,
      precio,
      subtotal
    ]

  );

  return resultado.insertId;

};

// ===================================
// OBTENER DETALLE DE UNA FACTURA
// ===================================

const obtenerPorFactura = async (id_factura) => {

  const [rows] = await pool.query(

    `SELECT
      d.id_detalle_factura,
      p.nombre,
      d.cantidad,
      d.precio,
      d.subtotal
     FROM detalle_factura d
     INNER JOIN productos p
        ON p.id_producto = d.id_producto
     WHERE d.id_factura = ?`,

    [id_factura]

  );

  return rows;

};

module.exports = {
  crear,
  obtenerPorFactura
};