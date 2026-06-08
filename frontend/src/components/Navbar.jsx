import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={estilos.navbar}>
      <h2 style={estilos.titulo}>🍯 Panalera</h2>
      <div style={estilos.enlaces}>
        <Link to="/productos" style={estilos.link}>Productos</Link>
        <Link to="/usuarios" style={estilos.link}>Usuarios</Link>
        <Link to="/clientes" style={estilos.link}>Clientes</Link>
        <Link to="/facturas" style={estilos.link}>Facturas</Link>
        <Link to="/login" style={estilos.link}>Salir</Link>
      </div>
    </nav>
  );
}

const estilos = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1e293b',
    color: 'white'
  },
  titulo: { margin: 0, color: '#f59e0b' },
  enlaces: { display: 'flex', gap: '1.5rem' },
  link: { color: 'white', textDecoration: 'none', fontWeight: 500 }
};