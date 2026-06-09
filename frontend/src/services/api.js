import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});


// ================= USUARIOS =================
export const obtenerUsuarios = () => api.get("/usuarios");

export const crearUsuario = (datos) =>
  api.post("/usuarios", datos);

export const eliminarUsuario = (id) =>
  api.delete(`/usuarios/${id}`);

export const actualizarUsuario = (id, datos) =>
  api.put(`/usuarios/${id}`, datos);


// ================= CLIENTES =================
export const obtenerClientes = () => api.get("/clientes");

export const crearCliente = (datos) =>
  api.post("/clientes", datos);

export const eliminarCliente = (id) =>
  api.delete(`/clientes/${id}`);

export const actualizarCliente = (id, datos) =>
  api.put(`/clientes/${id}`, datos);

export const obtenerCliente = (id) =>
  api.get(`/clientes/${id}`);


// ============================================
export default api;