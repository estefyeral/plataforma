const modelo = require('../models/detallefacturas');

exports.listar = async (req, res) => {
  try {
    const datos = await modelo.obtenerTodos();
    res.json(datos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.uno = async (req, res) => {
  try {
    const dato = await modelo.obtenerPorId(req.params.id);
    res.json(dato);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const nuevo = await modelo.crear(req.body);
    res.json(nuevo);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const editado = await modelo.actualizar(req.params.id, req.body);
    res.json(editado);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await modelo.eliminar(req.params.id);
    res.json({ mensaje: 'Eliminado correctamente' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};