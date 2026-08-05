import { useState, useEffect } from "react";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from "../services/api";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [form, setForm] = useState({
    id_producto: null,
    codigo: "",
    nombre: "",
    marca: "",
    precio_venta: "",
    stock: "",
    fecha_vencimiento: "",
    imagen: ""
  });
  const [editando, setEditando] = useState(false);

  // ================= CARGAR =================
  const cargar = async () => {
    try {
      const res = await obtenerProductos();
      setProductos(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  // ================= LIMPIAR =================
  const limpiar = () => {
    setForm({
      id_producto: null,
      codigo: "",
      nombre: "",
      marca: "",
      precio_venta: "",
      stock: "",
      fecha_vencimiento: "",
      imagen: ""
    });
    setEditando(false);
  };

  // ================= GUARDAR =================
  const guardar = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await actualizarProducto(form.id_producto, form);
      } else {
        await crearProducto(form);
      }
      limpiar();
      cargar();
    } catch (error) {
      console.error("Error guardando producto:", error);
    }
  };

  // ================= EDITAR =================
  const editar = (producto) => {
    setForm({
      ...producto,
      fecha_vencimiento: producto.fecha_vencimiento
        ? producto.fecha_vencimiento.substring(0, 10)
        : ""
    });
    setEditando(true);
  };

  // ================= ELIMINAR =================
  const eliminar = async (id) => {
    if (!window.confirm("¿Desea eliminar este producto?")) return;
    try {
      await eliminarProducto(id);
      cargar();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  // ================= FILTRO =================
  const productosFiltrados = productos.filter((p) => {
    const texto = (buscar || "").toLowerCase();
    return (
      (p.codigo || "").toLowerCase().includes(texto) ||
      (p.nombre || "").toLowerCase().includes(texto) ||
      (p.marca || "").toLowerCase().includes(texto) ||
      String(p.stock || "").includes(texto) ||
      String(p.precio_venta || "").includes(texto)
    );
  });

  // ================= DIAS PARA VENCER =================
  const diasParaVencer = (fecha) => {
    if (!fecha) return null;
    const hoy = new Date();
    const vencimiento = new Date(fecha);
    const diferencia = vencimiento - hoy;
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Productos</h1>

      {/* BUSCADOR */}
      <input
        placeholder="🔎 Buscar productos..."
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
        style={{ padding: "8px", width: "300px", marginBottom: "10px" }}
      />

      {/* FORMULARIO */}
      <form onSubmit={guardar} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Código"
          value={form.codigo}
          onChange={(e) => setForm({ ...form, codigo: e.target.value })}
        />
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          placeholder="Marca"
          value={form.marca}
          onChange={(e) => setForm({ ...form, marca: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={form.precio_venta}
          onChange={(e) => setForm({ ...form, precio_venta: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <input
          type="date"
          value={form.fecha_vencimiento}
          onChange={(e) =>
            setForm({ ...form, fecha_vencimiento: e.target.value })
          }
        />
        <input
          placeholder="Imagen"
          value={form.imagen}
          onChange={(e) => setForm({ ...form, imagen: e.target.value })}
        />

        <button type="submit">
          {editando ? "Actualizar" : "Guardar"}
        </button>
        {editando && (
          <button type="button" onClick={limpiar}>
            Cancelar
          </button>
        )}
      </form>

      {/* LISTA */}
      {productosFiltrados.length > 0 ? (
        productosFiltrados.map((p) => {
          const dias = diasParaVencer(p.fecha_vencimiento);
          return (
            <div
              key={p.id_producto}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px"
              }}
            >
              <p><strong>{p.nombre}</strong></p>
              <p>Marca: {p.marca}</p>
              <p>Precio: {p.precio_venta}</p>
              <p>Stock: {p.stock}</p>
              <p>
                {p.fecha_vencimiento
                  ? new Date(p.fecha_vencimiento).toLocaleDateString()
                  : "Sin fecha"}
              </p>

              {/* ALERTA DE VENCIMIENTO */}
              {dias !== null && (
                <p
                  style={{
                    color: dias <= 5 ? "red" : dias <= 10 ? "orange" : "green",
                    fontWeight: "bold"
                  }}
                >
                  {dias < 0
                    ? "⚠️ Producto vencido"
                    : `⏳ Vence en ${dias} días`}
                </p>
              )}

              <button onClick={() => editar(p)}>Editar</button>
              <button onClick={() => eliminar(p.id_producto)}>Eliminar</button>
            </div>
          );
        })
      ) : (
        <p>No hay productos registrados</p>
      )}
    </div>
  );
}

export default Productos;
