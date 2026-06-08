const pool = require('../config/db');
const obtenerTodos = async () => { const [res] = await pool.query('SELECT * FROM facturas'); return res; };
const obtenerPorId = async (id) => { const [res] = await pool.query('SELECT * FROM facturas WHERE id_factura = ?', [id]); return res[0]; };
const crear = async (datos) => { const { fecha, id_cliente, id_empleado, total } = datos; const [res] = await pool.query('INSERT INTO facturas (fecha, id_cliente, id_empleado, total) VALUES (?, ?, ?, ?)', [fecha, id_cliente, id_empleado, total]); return { id: res.insertId, ...datos }; };
const actualizar = async (id, datos) => { const { fecha, id_cliente, id_empleado, total } = datos; await pool.query('UPDATE facturas SET fecha=?, id_cliente=?, id_empleado=?, total=? WHERE id_factura=?', [fecha, id_cliente, id_empleado, total, id]); return {id, ...datos}; };
const eliminar = async (id) => { await pool.query('DELETE FROM facturas WHERE id_factura = ?', [id]); return true; };
module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };