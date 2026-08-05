const pool = require("../config/db");

// ==========================
// OBTENER TODAS LAS COMPRAS
// ==========================

const obtenerTodas = async () => {

  const [rows] = await pool.query(`
    SELECT
      c.id_compra,
      c.fecha,
      p.nombre AS proveedor,
      c.total
    FROM compras c
    INNER JOIN proveedores p
      ON c.id_proveedor = p.id_proveedor
    ORDER BY c.id_compra DESC
  `);

  return rows;
};

// ==========================
// OBTENER COMPRA POR ID
// ==========================

const obtenerPorId = async (id) => {

  const [rows] = await pool.query(
    "SELECT * FROM compras WHERE id_compra = ?",
    [id]
  );

  return rows[0];
};

// ==========================
// COMPRAS DE HOY
// ==========================

const obtenerComprasHoy = async () => {

  const [rows] = await pool.query(`
    SELECT
      IFNULL(SUM(total),0) AS compras_hoy
    FROM compras
    WHERE DATE(fecha) = CURDATE()
  `);

  return rows[0];

};

// ==========================
// CREAR COMPRA
// ==========================

const crear = async (datos) => {

  const {
    id_proveedor,
    detalle,
    total
  } = datos;

  const conexion = await pool.getConnection();

  try {

    await conexion.beginTransaction();

    // Guardar compra

    const [resultado] = await conexion.query(

      `INSERT INTO compras
      (
        fecha,
        id_proveedor,
        total
      )
      VALUES
      (
        NOW(),
        ?,
        ?
      )`,

      [
        id_proveedor,
        total
      ]

    );

    const idCompra = resultado.insertId;

    // Guardar detalle

    for (const producto of detalle) {

      await conexion.query(

        `INSERT INTO detalle_compra
        (
          id_compra,
          id_producto,
          cantidad,
          precio,
          subtotal
        )
        VALUES
        (
          ?,
          ?,
          ?,
          ?,
          ?
        )`,

        [
          idCompra,
          producto.id_producto,
          producto.cantidad,
          producto.precio,
          producto.subtotal
        ]

      );

      // Aumentar stock

      await conexion.query(

        `UPDATE productos
         SET stock = stock + ?
         WHERE id_producto = ?`,

        [
          producto.cantidad,
          producto.id_producto
        ]

      );

    }

    await conexion.commit();

    return idCompra;

  } catch (error) {

    await conexion.rollback();
    throw error;

  } finally {

    conexion.release();

  }

};

// ==========================
// ELIMINAR
// ==========================

const eliminar = async (id) => {

  await pool.query(
    "DELETE FROM compras WHERE id_compra = ?",
    [id]
  );

};

module.exports = {

  obtenerTodas,
  obtenerPorId,
  obtenerComprasHoy,
  crear,
  eliminar

};