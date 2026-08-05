import ModalDetalleCompra from "../components/ModalDetalleCompra";
import { useState, useEffect } from "react";
import {
  obtenerProveedores,
  obtenerProductos,
  crearCompra,
  obtenerCompras
} from "../services/api";

function Compras() {

  // ============================
  // ESTADOS
  // ============================

  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);

  const [proveedorSeleccionado, setProveedorSeleccionado] = useState("");

  const [productoSeleccionado, setProductoSeleccionado] = useState("");

  const [cantidad, setCantidad] = useState(1);

  const [precioCompra, setPrecioCompra] = useState("");

  const [detalleCompra, setDetalleCompra] = useState([]);

  const [totalCompra, setTotalCompra] = useState(0);

  const [listaCompras, setListaCompras] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [compraSeleccionada, setCompraSeleccionada] = useState(null);

  // ============================
  // CARGAR DATOS
  // ============================

  useEffect(() => {
    cargarProveedores();
    cargarProductos();
    cargarCompras();
  }, []);

  const cargarProveedores = async () => {
    try {
      const res = await obtenerProveedores();
      setProveedores(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarProductos = async () => {
    try {
      const res = await obtenerProductos();
      setProductos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarCompras = async () => {
    try {
      const res = await obtenerCompras();
      setListaCompras(res.data);
    } catch (error) {
      console.error(error);
    }
  };

// ============================
// AGREGAR PRODUCTO
// ============================

const agregarProducto = () => {

  if (productoSeleccionado === "") {
    alert("Seleccione un producto");
    return;
  }

  if (precioCompra === "" || Number(precioCompra) <= 0) {
    alert("Ingrese un precio de compra válido");
    return;
  }

  if (Number(cantidad) <= 0) {
    alert("La cantidad debe ser mayor que cero");
    return;
  }

  const producto = productos.find(
    p => p.id_producto == productoSeleccionado
  );

  if (!producto) {
    alert("Producto no encontrado");
    return;
  }

  const subtotal =
    Number(precioCompra) * Number(cantidad);

  const nuevoDetalle = {
    id_producto: producto.id_producto,
    nombre: producto.nombre,
    cantidad: Number(cantidad),
    precio: Number(precioCompra),
    subtotal
  };

  setDetalleCompra([...detalleCompra, nuevoDetalle]);

  setTotalCompra(totalCompra + subtotal);

  setProductoSeleccionado("");
  setCantidad(1);
  setPrecioCompra("");

};

// ============================
// ELIMINAR PRODUCTO
// ============================

const eliminarProducto = (index) => {

  const lista = [...detalleCompra];

  const eliminado = lista[index];

  lista.splice(index, 1);

  setDetalleCompra(lista);

  setTotalCompra(
    totalCompra - eliminado.subtotal
  );

};

// ============================
// GUARDAR COMPRA
// ============================

const guardarCompra = async () => {

  if (proveedorSeleccionado === "") {
    alert("Seleccione un proveedor");
    return;
  }

  if (detalleCompra.length === 0) {
    alert("Debe agregar al menos un producto");
    return;
  }

  const compra = {
    id_proveedor: Number(proveedorSeleccionado),
    detalle: detalleCompra,
    total: totalCompra
  };

  try {

    console.log(compra);

    await crearCompra(compra);

    alert("Compra registrada correctamente");

    await cargarCompras();
    await cargarProductos();

    setProveedorSeleccionado("");
    setProductoSeleccionado("");
    setCantidad(1);
    setPrecioCompra("");
    setDetalleCompra([]);
    setTotalCompra(0);

  } catch (error) {

    console.error(error);

    alert("Error al registrar la compra");

  }

};

return (

  <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>

    <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
      Gestión de Compras
    </h1>

    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px"
      }}
    >

      <h3>Datos de la Compra</h3>

      {/* Proveedor */}

      <select
        value={proveedorSeleccionado}
        onChange={(e) => setProveedorSeleccionado(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px"
        }}
      >

        <option value="">
          Seleccione un proveedor
        </option>

        {proveedores.map((proveedor) => (

          <option
            key={proveedor.id_proveedor}
            value={proveedor.id_proveedor}
          >
            {proveedor.nombre}
          </option>

        ))}

      </select>

      {/* Producto */}

      <select
        value={productoSeleccionado}
        onChange={(e) => setProductoSeleccionado(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px"
        }}
      >

        <option value="">
          Seleccione un producto
        </option>

        {productos.map((producto) => (

          <option
            key={producto.id_producto}
            value={producto.id_producto}
          >
            {producto.nombre}
          </option>

        ))}

      </select>

      {/* Cantidad */}

      <input
        type="number"
        min="1"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        placeholder="Cantidad"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px"
        }}
      />

      {/* Precio de compra */}

      <input
        type="number"
        min="1"
        value={precioCompra}
        onChange={(e) => setPrecioCompra(e.target.value)}
        placeholder="Precio de compra"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px"
        }}
      />

      <button
        onClick={agregarProducto}
        style={{
          background: "green",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Agregar Producto
      </button>

    </div>

    {/* ==========================
        DETALLE DE LA COMPRA
    ========================== */}

    <div
      style={{
        marginTop: "30px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px"
      }}
    >

      <h3>Detalle de la Compra</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >

        <thead>
          <tr>
            <th style={styles.th}>Producto</th>
            <th style={styles.th}>Cantidad</th>
            <th style={styles.th}>Precio Compra</th>
            <th style={styles.th}>Subtotal</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {detalleCompra.length === 0 ? (

            <tr>
              <td colSpan="5" style={styles.td}>
                No hay productos agregados
              </td>
            </tr>

          ) : (

            detalleCompra.map((item, index) => (

              <tr key={index}>

                <td style={styles.td}>{item.nombre}</td>

                <td style={styles.td}>{item.cantidad}</td>

                <td style={styles.td}>
                  ${Number(item.precio).toLocaleString()}
                </td>

                <td style={styles.td}>
                  ${Number(item.subtotal).toLocaleString()}
                </td>

                <td style={styles.td}>

                  <button
                    onClick={() => eliminarProducto(index)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

    {/* ==========================
        TOTAL
    ========================== */}

    <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "flex-end",
        gap: "15px",
        alignItems: "center"
      }}
    >

      <h2>Total:</h2>

      <h2 style={{ color: "green" }}>
        ${Number(totalCompra).toLocaleString()}
      </h2>

    </div>

    {/* ==========================
        BOTONES
    ========================== */}

    <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px"
      }}
    >

      <button
        onClick={guardarCompra}
        style={{
          background: "#16a34a",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Guardar Compra
      </button>

      <button
        onClick={() => {

          setProveedorSeleccionado("");
          setProductoSeleccionado("");
          setCantidad(1);
          setPrecioCompra("");
          setDetalleCompra([]);
          setTotalCompra(0);

        }}
        style={{
          background: "gray",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Cancelar
      </button>

    </div>

    {/* ==========================
        HISTORIAL DE COMPRAS
    ========================== */}

    <div
      style={{
        marginTop: "40px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px"
      }}
    >

      <h2>Historial de Compras</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >

        <thead>

          <tr>

            <th style={styles.th}>Compra</th>
            <th style={styles.th}>Fecha</th>
            <th style={styles.th}>Proveedor</th>
            <th style={styles.th}>Total</th>
            <th style={styles.th}>Acciones</th>

          </tr>

        </thead>

        <tbody>

          {listaCompras.length === 0 ? (

            <tr>

              <td colSpan="5" style={styles.td}>
                No hay compras registradas
              </td>

            </tr>

          ) : (

            listaCompras.map((compra) => (

              <tr key={compra.id_compra}>

                <td style={styles.td}>{compra.id_compra}</td>

                <td style={styles.td}>
                  {new Date(compra.fecha).toLocaleDateString()}
                </td>

                <td style={styles.td}>{compra.proveedor}</td>

                <td style={styles.td}>
                  ${Number(compra.total).toLocaleString()}
                </td>

                <td style={styles.td}>
                  <button
                    onClick={()=> {
                      setCompraSeleccionada(compra.id_compra);
                      setMostrarModal(true);
                    }}
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    ver
                    </button> 
                </td>


              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

    <ModalDetalleCompra
      visible={mostrarModal}
      idCompra={compraSeleccionada}
      onClose={() => setMostrarModal(false)}
    />

  </div>

);

}

const styles = {

  th: {
    border: "1px solid #ddd",
    padding: "10px",
    background: "#1e293b",
    color: "white"
  },

  td: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center"
  }

};

export default Compras;