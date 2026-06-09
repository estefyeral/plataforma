const express = require('express');
const cors = require('cors');

// RUTAS
const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');
const clientesRoutes = require('./routes/clientes');
const proveedoresRoutes = require('./routes/proveedores');
const empleadosRoutes = require('./routes/empleados');
const rolesRoutes = require('./routes/roles');
const productosRoutes = require('./routes/productos');
const productoproveedorRoutes = require('./routes/productoproveedor');
const comprasRoutes = require('./routes/compras');
const detallecomprasRoutes = require('./routes/detallecompras');
//const detellefacturasRoutes = require('./routes/detallefacturas');
const facturasRoutes = require('./routes/facturas');
const cajadiariaRoutes = require('./routes/cajadiaria');

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// RUTAS API
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/productoproveedor', productoproveedorRoutes);
app.use('/api/compras', comprasRoutes);
app.use('/api/detallecompras', detallecomprasRoutes);
//app.use('/api/detallefacturas', detallefacturasRoutes);
app.use('/api/facturas', facturasRoutes);
app.use('/api/cajadiaria', cajadiariaRoutes);

// RUTA PRINCIPAL
app.get('/', (req, res) => {
  res.send('✅ Servidor funcionando perfectamente 🚀');
});

// INICIAR SERVIDOR
app.listen(3000, () => {
  console.log('✅ Servidor corriendo en http://localhost:3000');
});