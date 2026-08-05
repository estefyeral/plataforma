const pool = require('../config/db');

// ==========================
// OBTENER TODAS LAS FACTURAS
// ==========================

const obtenerTodas = async () => {

  const [rows] = await pool.query(`
    SELECT
      f.id_factura,
      c.nombre AS cliente,
      f.fecha,
      f.total
    FROM facturas f
    INNER JOIN clientes c
      ON c.id_cliente = f.id_cliente
    ORDER BY f.id_factura DESC
  `);

  return rows;
};

// ==========================
// VENTAS DE HOY
// ==========================

const obtenerVentasHoy = async () => {

  const [rows] = await pool.query(`
    SELECT
      IFNULL(SUM(total),0) AS ventas_hoy
    FROM facturas
    WHERE DATE(fecha) = CURDATE()
  `);

  return rows[0];

};

// ==========================
// OBTENER FACTURA POR ID
// ==========================

const obtenerPorId = async (id) => {

  const [rows] = await pool.query(
    "SELECT * FROM facturas WHERE id_factura = ?",
    [id]
  );

  return rows[0];
};

// ==========================
// CREAR FACTURA
// ==========================

const crear = async (datos) => {

  console.log("===== DATOS RECIBIDOS =====");
  console.log(datos);

  console.log("===== DETALLE =====");
  console.log(datos.detalle);

  const {
    id_cliente,
    id_empleado,
    total,
    detalle
  } = datos;

  // INSERTAR FACTURA

  const [resultado] = await pool.query(

    `INSERT INTO facturas
    (
      fecha,
      id_cliente,
      id_empleado,
      total
    )
    VALUES
    (
      NOW(),
      ?,
      ?,
      ?
    )`,

    [
      id_cliente,
      id_empleado,
      total
    ]

  );

  const idFactura = resultado.insertId;

  // INSERTAR DETALLE

  for (const producto of detalle) {

    console.log("=================================");
    console.log("Insertando producto:");
    console.log(producto);

    const [resultadoDetalle] = await pool.query(

      `INSERT INTO detalle_factura
      (
        id_factura,
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
        idFactura,
        producto.id_producto,
        producto.cantidad,
        producto.precio,
        producto.subtotal
      ]

    );

    console.log("Resultado INSERT:");
    console.log(resultadoDetalle);

    // ==========================
    // DESCONTAR STOCK
    // ==========================

    await pool.query(

      `UPDATE productos
       SET stock = stock - ?
       WHERE id_producto = ?`,

      [
        producto.cantidad,
        producto.id_producto
      ]

    );

    console.log("Stock actualizado");
    console.log("=================================");

  }

  return idFactura;

};

// ==========================
// ELIMINAR FACTURA
// ==========================

const eliminar = async (id) => {

  await pool.query(
    "DELETE FROM facturas WHERE id_factura = ?",
    [id]
  );

  return true;

};

// ==========================
// OBTENER DETALLE FACTURA
// ==========================

const obtenerDetalle = async (id) => {

  const [rows] = await pool.query(
    `
    SELECT
      df.id_detalle_factura,
      p.nombre,
      df.cantidad,
      df.precio,
      df.subtotal
    FROM detalle_factura df
    INNER JOIN productos p
      ON p.id_producto = df.id_producto
    WHERE df.id_factura = ?
    `,
    [id]
  );

  return rows;

};

// ==========================
// VENTAS ÚLTIMOS 7 DÍAS
// ==========================

const obtenerVentasSemana = async () => {

  const [rows] = await pool.query(`
    SELECT
      DATE_FORMAT(dia, '%d/%m') AS fecha,
      total
    FROM (
      SELECT
        DATE(fecha) AS dia,
        SUM(total) AS total
      FROM facturas
      WHERE DATE(fecha) >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
      GROUP BY DATE(fecha)
    ) AS ventas
    ORDER BY dia
  `);

  return rows;

};

// ==========================
// ÚLTIMAS FACTURAS
// ==========================

const obtenerUltimasFacturas = async () => {

  const [rows] = await pool.query(`
    SELECT
      f.id_factura,
      f.fecha,
      c.nombre AS cliente,
      f.total
    FROM facturas f
    INNER JOIN clientes c
      ON c.id_cliente = f.id_cliente
    ORDER BY f.id_factura DESC
    LIMIT 5
  `);

  return rows;

};

module.exports = {

  obtenerTodas,
  obtenerPorId,
  obtenerDetalle,
  obtenerVentasHoy,
  obtenerVentasSemana,
  obtenerUltimasFacturas,
  crear,
  eliminar

};