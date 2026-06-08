export default function Footer() {
  return (
    <footer style={estilos.footer}>
      <p>© 2026 Panalera - Sistema de Gestión | SENA</p>
    </footer>
  );
}

const estilos = {
  footer: {
    marginTop: 'auto',
    padding: '1rem',
    textAlign: 'center',
    backgroundColor: '#1e293b',
    color: 'white'
  }
};