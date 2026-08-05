import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const salir = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={estilos.navbar}>
      <h2 style={estilos.titulo}>🍯 Pañalera</h2>

      <div style={estilos.enlaces}>
        <Link to="/productos" style={estilos.link}>
          Productos
        </Link>

        <Link to="/dashboard" style={estilos.link}>
          Dashboard
        </Link>

        <Link to="/usuarios" style={estilos.link}>
          Usuarios
        </Link>

        <Link to="/clientes" style={estilos.link}>
          Clientes
        </Link>

        <Link to="/facturas" style={estilos.link}>
          Facturas
        </Link>

        <Link to="/proveedores" style={estilos.link}>
          Proveedores
        </Link>

        <Link to="/empleados" style={estilos.link}>
          Empleados
        </Link>

        <Link to="/compras" style={estilos.link}>
          Compras
        </Link>

        <Link to="/alertas" style={estilos.link}>
          Alertas
        </Link>

        <Link to="/caja" style={estilos.link}>
          Caja Diaria
        </Link>

        <button
          onClick={salir}
          style={estilos.botonSalir}
        >
          Salir
        </button>
      </div>
    </nav>
  );
}

const estilos = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#1e293b",
    color: "white",
  },

  titulo: {
    margin: 0,
    color: "#f59e0b",
  },

  enlaces: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
    flexWrap: "wrap",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },

  botonSalir: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "16px",
  },
};