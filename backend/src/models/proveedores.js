const pool = require("../config/db");

// ==========================
// OBTENER TODOS
// ==========================

const obtenerTodos = async () => {

  const [rows] = await pool.query(
    "SELECT * FROM proveedores ORDER BY id_proveedor DESC"
  );

  return rows;

};

// ==========================
// OBTENER UNO
// ==========================

const obtenerPorId = async (id) => {

  const [rows] = await pool.query(
    "SELECT * FROM proveedores WHERE id_proveedor = ?",
    [id]
  );

  return rows[0];

};

// ==========================
// CREAR
// ==========================

const crear = async (datos) => {

  const {
    nombre,
    telefono,
    direccion
  } = datos;

  const [resultado] = await pool.query(

    `INSERT INTO proveedores
    (
      nombre,
      telefono,
      direccion
    )
    VALUES
    (
      ?,
      ?,
      ?
    )`,

    [
      nombre,
      telefono,
      direccion
    ]

  );

  return resultado.insertId;

};

// ==========================
// ACTUALIZAR
// ==========================

const actualizar = async (id, datos) => {

  const {
    nombre,
    telefono,
    direccion
  } = datos;

  await pool.query(

    `UPDATE proveedores
     SET
       nombre = ?,
       telefono = ?,
       direccion = ?
     WHERE id_proveedor = ?`,

    [
      nombre,
      telefono,
      direccion,
      id
    ]

  );

};

// ==========================
// ELIMINAR
// ==========================

const eliminar = async (id) => {

  await pool.query(
    "DELETE FROM proveedores WHERE id_proveedor = ?",
    [id]
  );

};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};