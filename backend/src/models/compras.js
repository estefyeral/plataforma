const pool = require('../config/db');
const obtenerTodos = async () => { const [res] = await pool.query('SELECT * FROM compras'); return res; };
const obtenerPorId = async (id) => { const [res] = await pool.query('SELECT * FROM compras WHERE id_compra = ?', [id]); return res[0]; };
const crear = async (datos) => { const { fecha, id_proveedor, total } = datos; const [res] = await pool.query('INSERT INTO compras (fecha, id_proveedor, total) VALUES (?, ?, ?)', [fecha, id_proveedor, total]); return { id: res.insertId, ...datos }; };
const actualizar = async (id, datos) => { const { fecha, id_proveedor, total } = datos; await pool.query('UPDATE compras SET fecha=?, id_proveedor=?, total=? WHERE id_compra=?', [fecha, id_proveedor, total, id]); return {id, ...datos}; };
const eliminar = async (id) => { await pool.query('DELETE FROM compras WHERE id_compra = ?', [id]); return true; };
module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };