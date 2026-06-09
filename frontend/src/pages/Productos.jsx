import { useState } from "react";

function Productos() {
  const [productos, setProductos] = useState([]);

  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [stock, setStock] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [imagen, setImagen] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [codigoEdit, setCodigoEdit] = useState("");
  const [nombreEdit, setNombreEdit] = useState("");
  const [marcaEdit, setMarcaEdit] = useState("");
  const [precioVentaEdit, setPrecioVentaEdit] = useState("");
  const [stockEdit, setStockEdit] = useState("");
  const [fechaVencimientoEdit, setFechaVencimientoEdit] = useState("");
  const [imagenEdit, setImagenEdit] = useState("");

  const agregarProducto = () => {
    if (
      !codigo || !nombre || !marca || !precioVenta || !stock || !fechaVencimiento
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const nuevoProducto = {
      id_producto: Date.now(),
      codigo,
      nombre,
      marca,
      precio_venta: precioVenta,
      stock,
      fecha_vencimiento: fechaVencimiento,
      imagen,
    };

    setProductos([...productos, nuevoProducto]);

    setCodigo("");
    setNombre("");
    setMarca("");
    setPrecioVenta("");
    setStock("");
    setFechaVencimiento("");
    setImagen("");
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id_producto !== id));
  };

  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id_producto);
    setCodigoEdit(producto.codigo);
    setNombreEdit(producto.nombre);
    setMarcaEdit(producto.marca);
    setPrecioVentaEdit(producto.precio_venta);
    setStockEdit(producto.stock);
    setFechaVencimientoEdit(producto.fecha_vencimiento);
    setImagenEdit(producto.imagen || "");
  };

  const guardarEdicion = () => {
    const actualizados = productos.map(prod =>
      prod.id_producto === editandoId
        ? {
            ...prod,
            codigo: codigoEdit,
            nombre: nombreEdit,
            marca: marcaEdit,
            precio_venta: precioVentaEdit,
            stock: stockEdit,
            fecha_vencimiento: fechaVencimientoEdit,
            imagen: imagenEdit,
          }
        : prod
    );

    setProductos(actualizados);
    setEditandoId(null);
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "6px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        REGISTRO DE PRODUCTOS
      </h1>

      {/* FORMULARIO */}
      <div style={{
        background: "#f4f4f4",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <h3>Nuevo Producto</h3>

        <input style={inputStyle} placeholder="Código" value={codigo} onChange={e => setCodigo(e.target.value)} />
        <input style={inputStyle} placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input style={inputStyle} placeholder="Marca" value={marca} onChange={e => setMarca(e.target.value)} />
        <input style={inputStyle} type="number" placeholder="Precio venta" value={precioVenta} onChange={e => setPrecioVenta(e.target.value)} />
        <input style={inputStyle} type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
        <input style={inputStyle} type="date" value={fechaVencimiento} onChange={e => setFechaVencimiento(e.target.value)} />
        <input style={inputStyle} placeholder="Imagen URL" value={imagen} onChange={e => setImagen(e.target.value)} />

        <button
          onClick={agregarProducto}
          style={{
            background: "green",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Registrar Producto
        </button>
      </div>

      {/* EDICIÓN */}
      {editandoId && (
        <div style={{
          border: "2px solid blue",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
          background: "#eef5ff"
        }}>
          <h3>Editar Producto</h3>

          <input style={inputStyle} value={codigoEdit} onChange={e => setCodigoEdit(e.target.value)} />
          <input style={inputStyle} value={nombreEdit} onChange={e => setNombreEdit(e.target.value)} />
          <input style={inputStyle} value={marcaEdit} onChange={e => setMarcaEdit(e.target.value)} />
          <input style={inputStyle} value={precioVentaEdit} onChange={e => setPrecioVentaEdit(e.target.value)} />
          <input style={inputStyle} value={stockEdit} onChange={e => setStockEdit(e.target.value)} />
          <input style={inputStyle} type="date" value={fechaVencimientoEdit} onChange={e => setFechaVencimientoEdit(e.target.value)} />
          <input style={inputStyle} value={imagenEdit} onChange={e => setImagenEdit(e.target.value)} />

          <button
            onClick={guardarEdicion}
            style={{ background: "green", color: "white", padding: "8px", marginRight: "10px" }}
          >
            Guardar
          </button>

          <button
            onClick={() => setEditandoId(null)}
            style={{ background: "gray", color: "white", padding: "8px" }}
          >
            Cancelar
          </button>
        </div>
      )}

      {/* RESULTADOS EN CASILLAS */}
      <h2>PRODUCTOS REGISTRADOS</h2>

      {productos.map(producto => (
        <div
          key={producto.id_producto}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "15px",
            background: "white"
          }}
        >

          <input style={inputStyle} value={producto.codigo} disabled />
          <input style={inputStyle} value={producto.nombre} disabled />
          <input style={inputStyle} value={producto.marca} disabled />
          <input style={inputStyle} value={producto.precio_venta} disabled />
          <input style={inputStyle} value={producto.stock} disabled />
          <input style={inputStyle} value={producto.fecha_vencimiento} disabled />

          {producto.imagen && (
            <input style={inputStyle} value={producto.imagen} disabled />
          )}

          <button
            onClick={() => eliminarProducto(producto.id_producto)}
            style={{
              background: "red",
              color: "white",
              padding: "8px",
              marginRight: "8px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Eliminar
          </button>

          <button
            onClick={() => iniciarEdicion(producto)}
            style={{
              background: "orange",
              color: "white",
              padding: "8px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Editar
          </button>

        </div>
      ))}

    </div>
  );
}

export default Productos;