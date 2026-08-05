const pool = require("../config/db");

const obtenerPorCompra = async (id_compra) => {

  console.log(">>> Ejecutando consulta de detalle_compra");

  const sql = `
    SELECT
      dc.id_detalle_compra,
      p.nombre,
      dc.cantidad,
      dc.precio,
      dc.subtotal
    FROM detalle_compra dc
    INNER JOIN productos p
      ON p.id_producto = dc.id_producto
    WHERE dc.id_compra = ?
  `;

  console.log(sql);

  const [rows] = await pool.query(sql, [id_compra]);

  return rows;
};

module.exports = {
  obtenerPorCompra
};