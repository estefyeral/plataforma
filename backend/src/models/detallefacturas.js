const pool = require('../config/db');

const obtenerTodos = async () => {
  const [res] = await pool.query('SELECT * FROM detalle_factura');
  return res;
};

const obtenerPorId = async (id) => {
  const [res] = await pool.query('SELECT * FROM detalle_factura WHERE id_detalle = ?', [id]);
  return res[0];
};

const crear = async (datos) => {
  const { id_factura, id_producto, cantidad, precio, subtotal } = datos;
  const [res] = await pool.query(
    'INSERT INTO detalle_factura (id_factura, id_producto, cantidad, precio, subtotal) VALUES (?, ?, ?, ?, ?)',
    [id_factura, id_producto, cantidad, precio, subtotal]
  );
  return { id: res.insertId, ...datos };
};

const actualizar = async (id, datos) => {
  const { id_factura, id_producto, cantidad, precio, subtotal } = datos;
  await pool.query(
    'UPDATE detalle_factura SET id_factura=?, id_producto=?, cantidad=?, precio=?, subtotal=? WHERE id_detalle=?',
    [id_factura, id_producto, cantidad, precio, subtotal, id]
  );
  return { id, ...datos };
};

const eliminar = async (id) => {
  await pool.query('DELETE FROM detalle_factura WHERE id_detalle = ?', [id]);
  return true;
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };