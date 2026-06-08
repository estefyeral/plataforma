import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [stock, setStock] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [imagen, setImagen] = useState("");

  // ✅ Estados nuevos para EDITAR
  const [editandoId, setEditandoId] = useState(null);
  const [codigoEdit, setCodigoEdit] = useState("");
  const [nombreEdit, setNombreEdit] = useState("");
  const [marcaEdit, setMarcaEdit] = useState("");
  const [precioVentaEdit, setPrecioVentaEdit] = useState("");
  const [stockEdit, setStockEdit] = useState("");
  const [fechaVencimientoEdit, setFechaVencimientoEdit] = useState("");
  const [imagenEdit, setImagenEdit] = useState("");

  // AGREGAR PRODUCTO
  const agregarProducto = () => {
    if (
      codigo === "" ||
      nombre === "" ||
      marca === "" ||
      precioVenta === "" ||
      stock === "" ||
      fechaVencimiento === ""
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

    // LIMPIAR CAMPOS
    setCodigo("");
    setNombre("");
    setMarca("");
    setPrecioVenta("");
    setStock("");
    setFechaVencimiento("");
    setImagen("");
  };

  // ELIMINAR PRODUCTO
  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter(
      (producto) => producto.id_producto !== id
    );
    setProductos(nuevosProductos);
  };

  // ✅ FUNCIÓN NUEVA: Preparar edición
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

  // ✅ FUNCIÓN NUEVA: Guardar cambios editados
  const guardarEdicion = () => {
    if (
      codigoEdit === "" || nombreEdit === "" || marcaEdit === "" ||
      precioVentaEdit === "" || stockEdit === "" || fechaVencimientoEdit === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }
    const actualizados = productos.map(prod => {
      if(prod.id_producto === editandoId){
        return {
          ...prod,
          codigo: codigoEdit,
          nombre: nombreEdit,
          marca: marcaEdit,
          precio_venta: precioVentaEdit,
          stock: stockEdit,
          fecha_vencimiento: fechaVencimientoEdit,
          imagen: imagenEdit
        };
      }
      return prod;
    });
    setProductos(actualizados);
    setEditandoId(null); // Salir del modo edición
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "20px",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "35px",
          }}
        >
          REGISTRO DE PRODUCTOS
        </h1>

        {/* CAMPOS DE FORMULARIO */}
        <input
          type="text"
          placeholder="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="number"
          placeholder="Precio de venta"
          value={precioVenta}
          onChange={(e) => setPrecioVenta(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="date"
          value={fechaVencimiento}
          onChange={(e) => setFechaVencimiento(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="URL de imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          onClick={agregarProducto}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Registrar Producto
        </button>

        {/* ✅ FORMULARIO DE EDICIÓN - APARECE AL EDITAR */}
        {editandoId && (
          <div style={{border:"1px solid blue", padding:"15px", margin:"20px 0", borderRadius:"5px"}}>
            <h3 style={{marginTop:0}}>Editar Producto</h3>
            <input type="text" placeholder="Código" value={codigoEdit} onChange={(e)=>setCodigoEdit(e.target.value)} style={{width:"100%", padding:"10px", marginBottom:"10px"}} />
            <input type="text" placeholder="Nombre" value={nombreEdit} onChange={(e)=>setNombreEdit(e.target.value)} style={{width:"100%", padding:"10px", marginBottom:"10px"}} />
            <input type="text" placeholder="Marca" value={marcaEdit} onChange={(e)=>setMarcaEdit(e.target.value)} style={{width:"100%", padding:"10px", marginBottom:"10px"}} />
            <input type="number" placeholder="Precio de venta" value={precioVentaEdit} onChange={(e)=>setPrecioVentaEdit(e.target.value)} style={{width:"100%", padding:"10px", marginBottom:"10px"}} />
            <input type="number" placeholder="Stock" value={stockEdit} onChange={(e)=>setStockEdit(e.target.value)} style={{width:"100%", padding:"10px", marginBottom:"10px"}} />
            <input type="date" value={fechaVencimientoEdit} onChange={(e)=>setFechaVencimientoEdit(e.target.value)} style={{width:"100%", padding:"10px", marginBottom:"10px"}} />
            <input type="text" placeholder="URL de imagen" value={imagenEdit} onChange={(e)=>setImagenEdit(e.target.value)} style={{width:"100%", padding:"10px", marginBottom:"10px"}} />
            <button onClick={guardarEdicion} style={{padding:"8px 15px", background:"green", color:"white", border:"none", marginRight:"10px", cursor:"pointer"}}>Guardar Cambios</button>
            <button onClick={() => setEditandoId(null)} style={{padding:"8px 15px", background:"gray", color:"white", border:"none", cursor:"pointer"}}>Cancelar</button>
          </div>
        )}

        <hr />
        <h2>PRODUCTOS REGISTRADOS</h2>

        {productos.length === 0 ? (
          <p>No hay productos registrados</p>
        ) : (
          productos.map((producto) => (
            <div
              key={producto.id_producto}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <p><strong>Código:</strong> {producto.codigo}</p>
              <p><strong>Nombre:</strong> {producto.nombre}</p>
              <p><strong>Marca:</strong> {producto.marca}</p>
              <p><strong>Precio venta:</strong> ${producto.precio_venta}</p>
              <p><strong>Stock:</strong> {producto.stock}</p>
              <p><strong>Fecha vencimiento:</strong> {producto.fecha_vencimiento}</p>
              {producto.imagen && (
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              )}
              <button
                onClick={() => eliminarProducto(producto.id_producto)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px",
                  cursor: "pointer",
                  marginRight: "8px"
                }}
              >
                Eliminar
              </button>
              {/* ✅ BOTÓN EDITAR NUEVO */}
              <button
                onClick={() => iniciarEdicion(producto)}
                style={{
                  background: "orange",
                  color: "white",
                  border: "none",
                  padding: "8px",
                  cursor: "pointer",
                }}
              >
                Editar
              </button>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
}

export default Productos;