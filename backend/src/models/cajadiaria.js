const pool = require('../config/db');
const obtenerTodos = async () => { const [res] = await pool.query('SELECT * FROM caja_diaria'); return res; };
const obtenerPorId = async (id) => { const [res] = await pool.query('SELECT * FROM caja_diaria WHERE id_caja = ?', [id]); return res[0]; };
const crear = async (datos) => { const { fecha, monto_inicial, monto_final, id_empleado } = datos; const [res] = await pool.query('INSERT INTO caja_diaria (fecha, monto_inicial, monto_final, id_empleado) VALUES (?, ?, ?, ?)', [fecha, monto_inicial, monto_final, id_empleado]); return { id: res.insertId, ...datos }; };
const actualizar = async (id, datos) => { const { fecha, monto_inicial, monto_final, id_empleado } = datos; await pool.query('UPDATE caja_diaria SET fecha=?, monto_inicial=?, monto_final=?, id_empleado=? WHERE id_caja=?', [fecha, monto_inicial, monto_final, id_empleado, id]); return {id, ...datos}; };
const eliminar = async (id) => { await pool.query('DELETE FROM caja_diaria WHERE id_caja = ?', [id]); return true; };
module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };