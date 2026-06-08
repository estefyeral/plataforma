const pool = require('../config/db');
const obtenerTodos = async () => { const [res] = await pool.query('SELECT * FROM detalle_compras'); return res; };
const obtenerPorId = async (id) => { const [res] = await pool.query('SELECT * FROM detalle_compras WHERE id_detalle_compra = ?', [id]); return res[0]; };
const crear = async (datos) => { const { id_compra, id_producto, cantidad, precio } = datos; const [res] = await pool.query('INSERT INTO detalle_compras (id_compra, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)', [id_compra, id_producto, cantidad, precio]); return { id: res.insertId, ...datos }; };
const actualizar = async (id, datos) => { const { id_compra, id_producto, cantidad, precio } = datos; await pool.query('UPDATE detalle_compras SET id_compra=?, id_producto=?, cantidad=?, precio=? WHERE id_detalle_compra=?', [id_compra, id_producto, cantidad, precio, id]); return {id, ...datos}; };
const eliminar = async (id) => { await pool.query('DELETE FROM detalle_compras WHERE id_detalle_compra = ?', [id]); return true; };
module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };