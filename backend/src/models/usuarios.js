const pool = require('../config/db');

// OBTENER TODOS
const obtenerTodos = async () => {
  const [res] = await pool.query('SELECT * FROM usuarios');
  return res;
};

// OBTENER POR ID
const obtenerPorId = async (id) => {
  const [res] = await pool.query(
    'SELECT * FROM usuarios WHERE id_usuario = ?',
    [id]
  );
  return res[0];
};

// CREAR
const crear = async (datos) => {
  const {
    nombre,
    usuario,
    correo,
    password,
    id_empleado,
    id_rol
  } = datos;

  const [res] = await pool.query(
    `INSERT INTO usuarios
    (nombre, usuario, correo, password, id_empleado, id_rol)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      nombre,
      usuario,
      correo,
      password,
      id_empleado,
      id_rol
    ]
  );

  return {
    id_usuario: res.insertId,
    nombre,
    usuario,
    correo,
    password,
    id_empleado,
    id_rol
  };
};

// ACTUALIZAR
const actualizar = async (id, datos) => {
  const {
    nombre,
    usuario,
    correo,
    password,
    id_empleado,
    id_rol
  } = datos;

  await pool.query(
    `UPDATE usuarios
     SET nombre=?,
         usuario=?,
         correo=?,
         password=?,
         id_empleado=?,
         id_rol=?
     WHERE id_usuario=?`,
    [
      nombre,
      usuario,
      correo,
      password,
      id_empleado,
      id_rol,
      id
    ]
  );

  return {
    id_usuario: id,
    nombre,
    usuario,
    correo,
    password,
    id_empleado,
    id_rol
  };
};

// ELIMINAR
const eliminar = async (id) => {
  await pool.query(
    'DELETE FROM usuarios WHERE id_usuario = ?',
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