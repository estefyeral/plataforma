import { useEffect, useState } from "react";
import api from "../services/api";

function ModalDetalleFactura({ idFactura, visible, onClose }) {
  const [detalle, setDetalle] = useState([]);

  useEffect(() => {
    if (visible && idFactura) {
      cargarDetalle();
    }
  }, [visible, idFactura]);

  const cargarDetalle = async () => {
    try {
      const res = await api.get(`/facturas/${idFactura}/detalle`);
      setDetalle(res.data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar el detalle de la factura");
    }
  };

  if (!visible) return null;

  const total = detalle.reduce(
    (suma, item) => suma + Number(item.subtotal),
    0
  );

  return (
    <div style={styles.fondo}>
      <div style={styles.modal}>
        <h2>Detalle de Factura #{idFactura}</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Producto</th>
              <th style={styles.th}>Cantidad</th>
              <th style={styles.th}>Precio</th>
              <th style={styles.th}>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {detalle.map((item) => (
              <tr key={item.id_detalle_factura}>
                <td style={styles.td}>{item.nombre}</td>
                <td style={styles.td}>{item.cantidad}</td>
                <td style={styles.td}>
                  ${Number(item.precio).toLocaleString()}
                </td>
                <td style={styles.td}>
                  ${Number(item.subtotal).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ textAlign: "right" }}>
          Total: ${total.toLocaleString()}
        </h3>

        <button style={styles.btnCerrar} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

const styles = {
  fondo: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },

  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "700px",
    maxHeight: "80%",
    overflowY: "auto"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px"
  },

  th: {
    background: "#1e293b",
    color: "#fff",
    padding: "10px",
    border: "1px solid #ddd"
  },

  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center"
  },

  btnCerrar: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default ModalDetalleFactura;