import { useState, useEffect } from 'react';
import {
  obtenerClientes,
  crearCliente,
  eliminarCliente,
  actualizarCliente
} from '../services/api';

function Clientes() {
  const [lista, setLista] = useState([]);

  const [form, setForm] = useState({
    id_cliente: null,
    nombre: '',
    telefono: '',
    direccion: ''
  });

  const [editando, setEditando] = useState(false);

  const cargar = async () => {
    const res = await obtenerClientes();
    setLista(res.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const limpiar = () => {
    setForm({ id_cliente: null, nombre: '', telefono: '', direccion: '' });
    setEditando(false);
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (editando) {
      await actualizarCliente(form.id_cliente, form);
    } else {
      await crearCliente(form);
    }

    limpiar();
    cargar();
  };

  const editar = (item) => {
    setForm(item);
    setEditando(true);
  };

  const eliminar = async (id) => {
    await eliminarCliente(id);
    cargar();
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.titulo}>Gestión de Clientes</h2>

      {/* FORMULARIO */}
      <div style={styles.card}>
        <h4>{editando ? "Editar Cliente" : "Nuevo Cliente"}</h4>

        <form onSubmit={guardar} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />

          <input
            style={styles.input}
            placeholder="Teléfono"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          />

          <input
            style={styles.input}
            placeholder="Dirección"
            value={form.direccion}
            onChange={(e) => setForm({ ...form, direccion: e.target.value })}
          />

          <div style={styles.botones}>
            <button type="submit" style={styles.btnGuardar}>
              {editando ? "Actualizar" : "Guardar"}
            </button>

            {editando && (
              <button type="button" onClick={limpiar} style={styles.btnCancelar}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABLA */}
      <div style={styles.card}>
        <h4>Lista de Clientes</h4>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Teléfono</th>
              <th style={styles.th}>Dirección</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {lista.map((item) => (
              <tr key={item.id_cliente}>
                <td style={styles.td}>{item.nombre}</td>
                <td style={styles.td}>{item.telefono}</td>
                <td style={styles.td}>{item.direccion}</td>
                <td style={styles.td}>
                  <button
                    style={styles.btnEdit}
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>

                  <button
                    style={styles.btnDelete}
                    onClick={() => eliminar(item.id_cliente)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Clientes;

/* ESTILOS */
const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },

  titulo: {
    textAlign: 'center'
  },

  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },

  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '10px'
  },

  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },

  botones: {
    gridColumn: 'span 3',
    display: 'flex',
    gap: '10px'
  },

  btnGuardar: {
    padding: '10px',
    background: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },

  btnCancelar: {
    padding: '10px',
    background: 'gray',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },

  table: {
    width: '100%',
    marginTop: '10px',
    borderCollapse: 'collapse'
  },

  th: {
    border: '1px solid #ddd',
    padding: '10px',
    background: '#1e293b',
    color: 'white'
  },

  td: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center'
  },

  btnEdit: {
    marginRight: '5px',
    padding: '5px 10px',
    background: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },

  btnDelete: {
    padding: '5px 10px',
    background: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};