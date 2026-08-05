import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// ================= PRODUCTOS =================

export const obtenerProductos = () =>
  api.get("/productos");

export const obtenerStockBajo = () =>
  api.get("/productos/stock-bajo");

export const crearProducto = (datos) =>
  api.post("/productos", datos);

export const actualizarProducto = (id, datos) =>
  api.put(`/productos/${id}`, datos);

export const eliminarProducto = (id) =>
  api.delete(`/productos/${id}`);

export const obtenerProducto = (id) =>
  api.get(`/productos/${id}`);

export default api;

// ================= USUARIOS =================

export const obtenerUsuarios = () => api.get("/usuarios");

export const crearUsuario = (datos) => api.post("/usuarios", datos);

export const actualizarUsuario = (id, datos) =>
  api.put(`/usuarios/${id}`, datos);

export const eliminarUsuario = (id) =>
  api.delete(`/usuarios/${id}`);

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

// ================= PROVEEDORES =================

export const obtenerProveedores = () =>
  api.get("/proveedores");

export const crearProveedor = (datos) =>
  api.post("/proveedores", datos);

export const actualizarProveedor = (id, datos) =>
  api.put(`/proveedores/${id}`, datos);

export const eliminarProveedor = (id) =>
  api.delete(`/proveedores/${id}`);

export const obtenerProveedor = (id) =>
  api.get(`/proveedores/${id}`);

// ================= FACTURAS =================

export const obtenerFacturas = () =>
  api.get("/facturas");

export const obtenerVentasHoy = () =>
  api.get("/facturas/ventas-hoy");

export const obtenerVentasSemana = () =>
  api.get("/facturas/ventas-semana");

export const obtenerUltimasFacturas = () =>
  api.get("/facturas/ultimas");

export const crearFactura = (datos) =>
  api.post("/facturas", datos);

export const eliminarFactura = (id) =>
  api.delete(`/facturas/${id}`);

// ================= COMPRAS =================

export const obtenerCompras = () =>
  api.get("/compras");

export const obtenerComprasHoy = () =>
  api.get("/compras/compras-hoy");

export const crearCompra = (datos) =>
  api.post("/compras", datos);

export const obtenerCompra = (id) =>
  api.get(`/compras/${id}`);

export const eliminarCompra = (id) =>
  api.delete(`/compras/${id}`);

