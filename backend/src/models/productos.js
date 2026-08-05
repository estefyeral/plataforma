const pool = require('../config/db');

// OBTENER TODOS
const obtenerTodos = async () => {
  const [res] = await pool.query('SELECT * FROM productos');
  return res;
};

// OBTENER POR ID
const obtenerPorId = async (id) => {
  const [res] = await pool.query(
    'SELECT * FROM productos WHERE id_producto = ?',
    [id]
  );

  return res[0];
};

// ==========================
// OBTENER STOCK BAJO
// ==========================

const obtenerStockBajo = async () => {

  const [rows] = await pool.query(`
    SELECT COUNT(*) AS stock_bajo
    FROM productos
    WHERE stock <= 5
  `);

  return rows[0];

};

// CREAR
const crear = async (datos) => {

  const {
    codigo,
    nombre,
    marca,
    precio_venta,
    stock,
    fecha_vencimiento,
    imagen
  } = datos;

  const [res] = await pool.query(
    `INSERT INTO productos
    (codigo, nombre, marca, precio_venta, stock, fecha_vencimiento, imagen)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      codigo,
      nombre,
      marca,
      precio_venta,
      stock,
      fecha_vencimiento,
      imagen
    ]
  );

  return {
    id_producto: res.insertId,
    codigo,
    nombre,
    marca,
    precio_venta,
    stock,
    fecha_vencimiento,
    imagen
  };

};

// ACTUALIZAR
const actualizar = async (id, datos) => {

  const {
    codigo,
    nombre,
    marca,
    precio_venta,
    stock,
    fecha_vencimiento,
    imagen
  } = datos;

  await pool.query(
    `UPDATE productos
    SET
      codigo=?,
      nombre=?,
      marca=?,
      precio_venta=?,
      stock=?,
      fecha_vencimiento=?,
      imagen=?
    WHERE id_producto=?`,
    [
      codigo,
      nombre,
      marca,
      precio_venta,
      stock,
      fecha_vencimiento,
      imagen,
      id
    ]
  );

  return {
    id_producto: id,
    codigo,
    nombre,
    marca,
    precio_venta,
    stock,
    fecha_vencimiento,
    imagen
  };

};

// ELIMINAR
const eliminar = async (id) => {

  await pool.query(
    'DELETE FROM productos WHERE id_producto=?',
    [id]
  );

  return true;

};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  obtenerStockBajo,
  crear,
  actualizar,
  eliminar
};