import generarFacturaPDF from "../utils/generarFacturaPDF";
import { useState, useEffect } from "react";
import {
  obtenerClientes,
  obtenerProductos,
  crearFactura,
  obtenerFacturas
} from "../services/api";

import ModalDetalleFactura from "../components/ModalDetalleFactura";

function Facturas() {

  // ============================
  // ESTADOS
  // ============================

  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  const [clienteSeleccionado, setClienteSeleccionado] = useState("");

  const [productoSeleccionado, setProductoSeleccionado] = useState("");

  const [cantidad, setCantidad] = useState(1);

  const [detalleFactura, setDetalleFactura] = useState([]);

  const [totalFactura, setTotalFactura] = useState(0);

  // ============================
// HISTORIAL DE FACTURAS
// ============================

  const [listaFacturas, setListaFacturas] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
    // ============================
  // CARGAR DATOS
  // ============================

  useEffect(() => {
    cargarClientes();
    cargarProductos();
    cargarFacturas();
  }, []);

  const cargarClientes = async () => {
    try {
      const res = await obtenerClientes();
      setClientes(res.data);
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

  const cargarFacturas = async () => {
    try {
      const res = await obtenerFacturas();
      setListaFacturas(res.data);
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

    const producto = productos.find(
        p => p.id_producto == productoSeleccionado
    );

    // ==========================
// VALIDAR STOCK DISPONIBLE
// ==========================

    if (Number(cantidad) > Number(producto.stock)) {
      alert(
        `Stock insuficiente.\n\nDisponible: ${producto.stock}\nSolicitado: ${cantidad}`
      );
      return;
    }

    if (!producto) {
        alert("Producto no encontrado");
        return;
    }

    const subtotal =
        Number(producto.precio_venta) *
        Number(cantidad);

    const nuevoDetalle = {
        id_producto: producto.id_producto,
        nombre: producto.nombre,
        precio: producto.precio_venta,
        cantidad: Number(cantidad),
        subtotal
    };

    setDetalleFactura([...detalleFactura, nuevoDetalle]);

    setTotalFactura(totalFactura + subtotal);

    setProductoSeleccionado("");
    setCantidad(1);

};

// ============================
// ELIMINAR PRODUCTO
// ============================

const eliminarProducto = (index) => {

    const listaNueva = [...detalleFactura];

    const eliminado = listaNueva[index];

    listaNueva.splice(index,1);

    setDetalleFactura(listaNueva);

    setTotalFactura(
        totalFactura - eliminado.subtotal
    );

};

// ============================
// GUARDAR FACTURA
// ============================

const guardarFactura = async () => {

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    alert("Debe iniciar sesión nuevamente.");
    return;
  }

  if (clienteSeleccionado === "") {
    alert("Seleccione un cliente");
    return;
  }

  if (detalleFactura.length === 0) {
    alert("Debe agregar al menos un producto");
    return;
  }

  const factura = {
    id_cliente: Number(clienteSeleccionado),
    id_empleado: usuario.id_empleado,
    detalle: detalleFactura,
    total: totalFactura
  };

  try {

    console.log(factura);

    const respuesta = await crearFactura(factura);
    
    await cargarFacturas();

    generarFacturaPDF({
      id: respuesta.id_factura,
      fecha: new Date().toLocaleDateString(),
      cliente: clientes.find(
        c => c.id_cliente === Number(clienteSeleccionado)
      ) ?.nombre,
      detalle: detalleFactura,
      total: totalFactura
    });

    alert("Factura registrada correctamente");

    setClienteSeleccionado("");
    setProductoSeleccionado("");
    setCantidad(1);
    setDetalleFactura([]);
    setTotalFactura(0);

  } catch (error) {

    console.error(error);
    alert("Error al guardar la factura");

  }

};

return (

  <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>

    <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
      Gestión de Facturas
    </h1>

    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}
    >

      <h3>Datos de la Factura</h3>

      {/* Cliente */}

      <select
        value={clienteSeleccionado}
        onChange={(e) => setClienteSeleccionado(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px"
        }}
      >

        <option value="">
          Seleccione un cliente
        </option>

        {clientes.map((cliente) => (

          <option
            key={cliente.id_cliente}
            value={cliente.id_cliente}
          >
            {cliente.nombre}
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
          cursor: "pointer",
          borderRadius: "5px"
        }}
      >
        Agregar Producto

      </button>
      
    </div>

       

  {/* ==========================
          DETALLE DE LA FACTURA
      =========================== */}

      <div
        style={{
          marginTop: "30px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px"
        }}
      >

        <h3>Detalle de la Factura</h3>

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
              <th style={styles.th}>Precio</th>
              <th style={styles.th}>Subtotal</th>
              <th style={styles.th}>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {detalleFactura.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  style={styles.td}
                >
                  No hay productos agregados
                </td>

              </tr>

            ) : (

              detalleFactura.map((item, index) => (

                <tr key={index}>

                  <td style={styles.td}>
                    {item.nombre}
                  </td>

                  <td style={styles.td}>
                    {item.cantidad}
                  </td>

                  <td style={styles.td}>
                    ${item.precio}
                  </td>

                  <td style={styles.td}>
                    ${item.subtotal}
                  </td>

                  <td style={styles.td}>

                    <button
                      onClick={() => eliminarProducto(index)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        cursor: "pointer",
                        borderRadius: "5px"
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
          TOTAL FACTURA
      ========================== */}

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "15px"
        }}
      >
        <h2>Total:</h2>

        <h2 style={{ color: "green" }}>
          ${totalFactura.toLocaleString()}
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
    onClick={guardarFactura}
    style={{
      background: "#16a34a",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  >
    Guardar Factura
  </button>

  <button
    onClick={() => {

      setClienteSeleccionado("");
      setProductoSeleccionado("");
      setCantidad(1);
      setDetalleFactura([]);
      setTotalFactura(0);

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
        HISTORIAL DE FACTURAS
    ========================== */}

    <div
      style={{
        marginTop: "40px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px"
      }}
    >

      <h2>Historial de Facturas</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >

        <thead>
          <tr>
            <th style={styles.th}>Factura</th>
            <th style={styles.th}>Fecha</th>
            <th style={styles.th}>Cliente</th>
            <th style={styles.th}>Total</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {listaFacturas.length === 0 ? (

            <tr>
              <td colSpan="5" style={styles.td}>
                No hay facturas registradas
              </td>
            </tr>

          ) : (

            listaFacturas.map((factura) => (

              <tr key={factura.id_factura}>
                
                <td style={styles.td}>{factura.id_factura}</td>
                <td style={styles.td}>
                  {new Date(factura.fecha).toLocaleString()}
                </td>
                <td style={styles.td}>{factura.cliente}</td>
                <td style={styles.td}>
                  ${Number(factura.total).toLocaleString()}
                </td>

                <td style={styles.td}>
                  <button
                    onClick={() =>  {
                      setFacturaSeleccionada(factura.id_factura);
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

    <ModalDetalleFactura
    visible={mostrarModal}
    idFactura={facturaSeleccionada}
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
export default Facturas;