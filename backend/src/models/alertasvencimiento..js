const pool = require('../config/db');
const obtenerTodos = async () => { const [res] = await pool.query('SELECT * FROM alertas_vencimiento'); return res; };
const obtenerPorId = async (id) => { const [res] = await pool.query('SELECT * FROM alertas_vencimiento WHERE id_alerta = ?', [id]); return res[0]; };
const crear = async (datos) => { const { id_producto, fecha_alerta, estado } = datos; const [res] = await pool.query('INSERT INTO alertas_vencimiento (id_producto, fecha_alerta, estado) VALUES (?, ?, ?)', [id_producto, fecha_alerta, estado]); return { id: res.insertId, ...datos }; };
const actualizar = async (id, datos) => { const { id_producto, fecha_alerta, estado } = datos; await pool.query('UPDATE alertas_vencimiento SET id_producto=?, fecha_alerta=?, estado=? WHERE id_alerta=?', [id_producto, fecha_alerta, estado, id]); return {id, ...datos}; };
const eliminar = async (id) => { await pool.query('DELETE FROM alertas_vencimiento WHERE id_alerta = ?', [id]); return true; };
module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };