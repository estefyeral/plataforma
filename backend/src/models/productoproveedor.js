const pool = require('../config/db');
const obtenerTodos = async () => { const [res] = await pool.query('SELECT * FROM producto_proveedor'); return res; };
const obtenerPorId = async (id) => { const [res] = await pool.query('SELECT * FROM producto_proveedor WHERE id = ?', [id]); return res[0]; };
const crear = async (datos) => { const { id_producto, id_proveedor, precio_compra } = datos; const [res] = await pool.query('INSERT INTO producto_proveedor (id_producto, id_proveedor, precio_compra) VALUES (?, ?, ?)', [id_producto, id_proveedor, precio_compra]); return { id: res.insertId, ...datos }; };
const actualizar = async (id, datos) => { const { id_producto, id_proveedor, precio_compra } = datos; await pool.query('UPDATE producto_proveedor SET id_producto=?, id_proveedor=?, precio_compra=? WHERE id=?', [id_producto, id_proveedor, precio_compra, id]); return {id, ...datos}; };
const eliminar = async (id) => { await pool.query('DELETE FROM producto_proveedor WHERE id = ?', [id]); return true; };
module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };