const modelo = require('../models/facturas');
exports.listar = async (req, res) => { try { res.json(await modelo.obtenerTodos()) } catch (e) { res.status(500).json({error:e.message}) } };
exports.uno = async (req, res) => { try { res.json(await modelo.obtenerPorId(req.params.id)) } catch (e) { res.status(500).json({error:e.message}) } };
exports.crear = async (req, res) => { try { res.json(await modelo.crear(req.body)) } catch (e) { res.status(500).json({error:e.message}) } };
exports.actualizar = async (req, res) => { try { res.json(await modelo.actualizar(req.params.id, req.body)) } catch (e) { res.status(500).json({error:e.message}) } };
exports.eliminar = async (req, res) => { try { await modelo.eliminar(req.params.id); res.json({mensaje:'Eliminado'}) } catch (e) { res.status(500).json({error:e.message}) } };