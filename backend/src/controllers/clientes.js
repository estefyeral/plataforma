const modelo = require('../models/clientes');

const crearCliente = async (req, res) => {
  try {
    const nuevo = await modelo.crear(req.body);
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarClientes = async (req, res) => {
  try {
    const datos = await modelo.obtenerTodos();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerCliente = async (req, res) => {
  try {
    const dato = await modelo.obtenerPorId(req.params.id);
    res.json(dato);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarCliente = async (req, res) => {
  try {
    const editado = await modelo.actualizar(req.params.id, req.body);
    res.json(editado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarCliente = async (req, res) => {
  try {
    await modelo.eliminar(req.params.id);
    res.json({ mensaje: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearCliente,
  listarClientes,
  obtenerCliente,
  actualizarCliente,
  eliminarCliente
};