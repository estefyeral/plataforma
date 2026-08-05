import { useEffect, useState } from "react";
import GraficaVentas from "../components/GraficaVentas";
import {
  obtenerProductos,
  obtenerClientes,
  obtenerProveedores,
  obtenerVentasHoy,
  obtenerComprasHoy,
  obtenerStockBajo,
  obtenerVentasSemana,
  obtenerUltimasFacturas
} from "../services/api";

function Dashboard() {
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [totalProveedores, setTotalProveedores] = useState(0);
  const [ventasHoy, setVentasHoy] = useState(0);
  const [comprasHoy, setComprasHoy] = useState(0);
  const [stockBajo, setStockBajo] = useState(0);
  const [ventasSemana, setVentasSemana] = useState([]);
  const [ultimasFacturas, setUltimasFacturas] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const productos = await obtenerProductos();
      const clientes = await obtenerClientes();
      const proveedores = await obtenerProveedores();
      const ventas = await obtenerVentasHoy();
      const compras = await obtenerComprasHoy();
      const stock = await obtenerStockBajo();
      const grafica = await obtenerVentasSemana();
      const ultimas = await obtenerUltimasFacturas();

      setTotalProductos(productos.data.length);
      setTotalClientes(clientes.data.length);
      setTotalProveedores(proveedores.data.length);
      setVentasHoy(ventas.data.ventas_hoy);
      setComprasHoy(compras.data.compras_hoy);
      setStockBajo(stock.data.stock_bajo);
      setVentasSemana(grafica.data);
      setUltimasFacturas(ultimas.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cards = [
    { titulo: "Ventas de Hoy", valor: `$${Number(ventasHoy).toLocaleString()}`, color: "#16a34a" },
    { titulo: "Compras de Hoy", valor: `$${Number(comprasHoy).toLocaleString()}`, color: "#2563eb" },
    { titulo: "Productos", valor: totalProductos, color: "#ea580c" },
    { titulo: "Clientes", valor: totalClientes, color: "#9333ea" },
    { titulo: "Proveedores", valor: totalProveedores, color: "#0891b2" },
    { titulo: "Stock Bajo", valor: stockBajo, color: "#dc2626" }
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "30px", textAlign: "center" }}>Dashboard</h1>

      {/* Tarjetas principales */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px"
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              background: card.color,
              color: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>{card.titulo}</h3>
            <h1 style={{ fontSize: "45px", textAlign: "center" }}>{card.valor}</h1>
          </div>
        ))}
      </div>

      {/* Contenedor de gráfica y facturas */}
      <div
        style={{
          marginTop: "40px",
          background: "white",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,.2)"
        }}
      >
        <GraficaVentas datos={ventasSemana} />

        <h2 style={{ margin: "30px 0 20px", color: "#1e293b" }}>Últimas Facturas</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={styles.th}>Factura</th>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Cliente</th>
              <th style={styles.th}>Total</th>
            </tr>
          </thead>
          <tbody>
            {ultimasFacturas.map((factura, i) => (
              <tr
                key={factura.id_factura}
                style={{ background: i % 2 === 0 ? "#f9fafb" : "white" }}
              >
                <td style={styles.td}>{factura.id_factura}</td>
                <td style={styles.td}>
                  {new Date(factura.fecha).toLocaleDateString()}
                </td>
                <td style={styles.td}>{factura.cliente}</td>
                <td style={styles.td}>
                  ${Number(factura.total).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default Dashboard;
