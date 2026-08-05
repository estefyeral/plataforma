import { useEffect, useState } from "react";
import api from "../services/api";

function ModalDetalleCompra({ visible, idCompra, onClose }) {

  const [detalle, setDetalle] = useState([]);

  useEffect(() => {

    if (visible && idCompra) {
      cargarDetalle();
    }

  }, [visible, idCompra]);

  const cargarDetalle = async () => {

    try {

      const res = await api.get(`/detallecompras/${idCompra}`);

      setDetalle(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  if (!visible) return null;

  const total = detalle.reduce(
    (suma, item) => suma + Number(item.subtotal),
    0
  );

  return (

    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        style={{
          background: "white",
          width: "700px",
          padding: "20px",
          borderRadius: "8px"
        }}
      >

        <h2>Detalle Compra #{idCompra}</h2>

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

            </tr>

          </thead>

          <tbody>

            {detalle.map((item) => (

              <tr key={item.id_detalle_compra}>

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

        <h3
          style={{
            textAlign: "right",
            marginTop: "20px"
          }}
        >
          Total: ${total.toLocaleString()}
        </h3>

        <div
          style={{
            textAlign: "right"
          }}
        >

          <button
            onClick={onClose}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Cerrar
          </button>

        </div>

      </div>

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

export default ModalDetalleCompra;