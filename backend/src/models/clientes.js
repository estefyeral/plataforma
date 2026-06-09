const pool = require('../config/db');

// OBTENER TODOS
const obtenerTodos = async () => {
  const [res] = await pool.query('SELECT * FROM clientes');
  return res;
};

// OBTENER POR ID
const obtenerPorId = async (id) => {
  const [res] = await pool.query(
    'SELECT * FROM clientes WHERE id_cliente = ?',
    [id]
  );
  return res[0];
};

// CREAR
const crear = async (datos) => {
  const { nombre, telefono, direccion } = datos;

  const [res] = await pool.query(
    'INSERT INTO clientes (nombre, telefono, direccion) VALUES (?, ?, ?)',
    [nombre, telefono, direccion]
  );

  return {
    id_cliente: res.insertId,
    nombre,
    telefono,
    direccion
  };
};

// ACTUALIZAR
const actualizar = async (id, datos) => {
  const { nombre, telefono, direccion } = datos;

  await pool.query(
    'UPDATE clientes SET nombre=?, telefono=?, direccion=? WHERE id_cliente=?',
    [nombre, telefono, direccion, id]
  );

  return { id_cliente: id, nombre, telefono, direccion };
};

// ELIMINAR
const eliminar = async (id) => {
  await pool.query(
    'DELETE FROM clientes WHERE id_cliente = ?',
    [id]
  );

  return true;
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};