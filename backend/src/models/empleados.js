const pool = require('../config/db');
const obtenerTodos = async () => { const [res] = await pool.query('SELECT * FROM empleados'); return res; };
const obtenerPorId = async (id) => { const [res] = await pool.query('SELECT * FROM empleados WHERE id_empleado = ?', [id]); return res[0]; };
const crear = async (datos) => { const { nombre, apellido, cargo, telefono } = datos; const [res] = await pool.query('INSERT INTO empleados (nombre, apellido, cargo, telefono) VALUES (?, ?, ?, ?)', [nombre, apellido, cargo, telefono]); return { id: res.insertId, ...datos }; };
const actualizar = async (id, datos) => { const { nombre, apellido, cargo, telefono } = datos; await pool.query('UPDATE empleados SET nombre=?, apellido=?, cargo=?, telefono=? WHERE id_empleado=?', [nombre, apellido, cargo, telefono, id]); return {id, ...datos}; };
const eliminar = async (id) => { await pool.query('DELETE FROM empleados WHERE id_empleado = ?', [id]); return true; };
module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };