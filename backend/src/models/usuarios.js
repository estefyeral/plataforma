const pool = require('../config/db');

const obtenerTodos = async () => {
  const [res] = await pool.query('SELECT * FROM usuarios');
  return res;
};

const obtenerPorId = async (id) => {
  const [res] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
  return res[0];
};

const crear = async (datos) => {
  const { usuario, password, id_empleado, id_rol } = datos;
  const [res] = await pool.query(
    'INSERT INTO usuarios (usuario, password, id_empleado, id_rol) VALUES (?, ?, ?, ?)',
    [usuario, password, id_empleado, id_rol]
  );
  return { id: res.insertId, usuario, id_empleado, id_rol };
};

const actualizar = async (id, datos) => {
  const { usuario, password, id_empleado, id_rol } = datos;
  await pool.query(
    'UPDATE usuarios SET usuario=?, password=?, id_empleado=?, id_rol=? WHERE id_usuario=?',
    [usuario, password, id_empleado, id_rol, id]
  );
  return { id, usuario, id_empleado, id_rol };
};

const eliminar = async (id) => {
  await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
  return true;
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };