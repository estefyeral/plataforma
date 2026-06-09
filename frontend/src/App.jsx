import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Productos from './pages/Productos';
import Usuarios from './pages/Usuarios';
import Clientes from './pages/Clientes';
import Facturas from './pages/Facturas';
import Proveedores from './pages/Proveedores';
import Empleados from './pages/Empleados';
import Compras from './pages/Compras';
import Alertas from './pages/Alertas';
import Caja from './pages/Caja';

function App() {
  return (
    <BrowserRouter>

      <Navbar />   {/* 👈 AQUÍ VA */}

      <Routes>
        <Route path="/productos" element={<Productos />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/facturas" element={<Facturas />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/caja" element={<Caja />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;