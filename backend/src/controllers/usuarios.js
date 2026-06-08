// 👇 LLAMA AL MODELO QUE TÚ TIENES: usuarios.js (PLURAL)
const modelo = require('../models/usuarios');

const crearUsuario = async (req, res) => {
  try {
    const nuevo = await modelo.crear(req.body);
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const datos = await modelo.obtenerTodos();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerUsuario = async (req, res) => {
  try {
    const dato = await modelo.obtenerPorId(req.params.id);
    res.json(dato);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const editado = await modelo.actualizar(req.params.id, req.body);
    res.json(editado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    await modelo.eliminar(req.params.id);
    res.json({ mensaje: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
};