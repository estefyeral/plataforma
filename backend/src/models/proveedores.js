const pool = require('../config/db');

const obtenerTodos = async () => {
  const [res] = await pool.query('SELECT * FROM proveedores');
  return res;
};

const obtenerPorId = async (id) => {
  const [res] = await pool.query('SELECT * FROM proveedores WHERE id_proveedor = ?', [id]);
  return res[0];
};

const crear = async (datos) => {
  const { nombre, telefono, direccion, correo } = datos;
  const [res] = await pool.query(
    'INSERT INTO proveedores (nombre, telefono, direccion, correo) VALUES (?, ?, ?, ?)',
    [nombre, telefono, direccion, correo]
  );
  return { id: res.insertId, ...datos };
};

const actualizar = async (id, datos) => {
  const { nombre, telefono, direccion, correo } = datos;
  await pool.query(
    'UPDATE proveedores SET nombre=?, telefono=?, direccion=?, correo=? WHERE id_proveedor=?',
    [nombre, telefono, direccion, correo, id]
  );
  return { id, ...datos };
};

const eliminar = async (id) => {
  await pool.query('DELETE FROM proveedores WHERE id_proveedor = ?', [id]);
  return true;
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };