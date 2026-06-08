const pool = require('../config/db');
const obtenerTodos = async () => { const [res] = await pool.query('SELECT * FROM clientes'); return res; };
const obtenerPorId = async (id) => { const [res] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [id]); return res[0]; };
const crear = async (datos) => { const { nombre, telefono, direccion, correo } = datos; const [res] = await pool.query('INSERT INTO clientes (nombre, telefono, direccion, correo) VALUES (?, ?, ?, ?)', [nombre, telefono, direccion, correo]); return { id: res.insertId, ...datos }; };
const actualizar = async (id, datos) => { const { nombre, telefono, direccion, correo } = datos; await pool.query('UPDATE clientes SET nombre=?, telefono=?, direccion=?, correo=? WHERE id_cliente=?', [nombre, telefono, direccion, correo, id]); return {id, ...datos}; };
const eliminar = async (id) => { await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [id]); return true; };
module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };