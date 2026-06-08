const pool = require('../config/db');

const obtenerTodos = async () => {
  const [res] = await pool.query('SELECT * FROM roles');
  return res;
};

const obtenerPorId = async (id) => {
  const [res] = await pool.query('SELECT * FROM roles WHERE id_rol = ?', [id]);
  return res[0];
};

const crear = async (datos) => {
  const { nombre_rol, descripcion } = datos;
  const [res] = await pool.query(
    'INSERT INTO roles (nombre_rol, descripcion) VALUES (?, ?)',
    [nombre_rol, descripcion]
  );
  return { id: res.insertId, ...datos };
};

const actualizar = async (id, datos) => {
  const { nombre_rol, descripcion } = datos;
  await pool.query(
    'UPDATE roles SET nombre_rol=?, descripcion=? WHERE id_rol=?',
    [nombre_rol, descripcion, id]
  );
  return { id, ...datos };
};

const eliminar = async (id) => {
  await pool.query('DELETE FROM roles WHERE id_rol = ?', [id]);
  return true;
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };