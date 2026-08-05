import { useState, useEffect } from "react";
import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../services/api";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const [form, setForm] = useState({
    id_usuario: null,
    nombre: "",
    usuario: "",
    correo: "",
    password: "",
    id_empleado: "",
    id_rol: ""
  });

  const [editando, setEditando] = useState(false);

  const cargar = async () => {
    try {
      const res = await obtenerUsuarios();
      setUsuarios(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const limpiar = () => {
    setForm({
      id_usuario: null,
      nombre: "",
      usuario: "",
      correo: "",
      password: "",
      id_empleado: "",
      id_rol: ""
    });

    setEditando(false);
  };

  const guardar = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await actualizarUsuario(form.id_usuario, form);
      } else {
        await crearUsuario(form);
      }

      limpiar();
      cargar();
    } catch (error) {
      console.error(error);
    }
  };

  const editar = (usuario) => {
    setForm(usuario);
    setEditando(true);
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar usuario?")) return;

    try {
      await eliminarUsuario(id);
      cargar();
    } catch (error) {
      console.error(error);
    }
  };
    return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Gestión de Usuarios
      </h1>

      <form onSubmit={guardar}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) =>
            setForm({ ...form, nombre: e.target.value })
          }
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          placeholder="Usuario"
          value={form.usuario}
          onChange={(e) =>
            setForm({ ...form, usuario: e.target.value })
          }
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="email"
          placeholder="Correo"
          value={form.correo}
          onChange={(e) =>
            setForm({ ...form, correo: e.target.value })
          }
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="number"
          placeholder="ID Empleado"
          value={form.id_empleado}
          onChange={(e) =>
            setForm({ ...form, id_empleado: e.target.value })
          }
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="number"
          placeholder="ID Rol"
          value={form.id_rol}
          onChange={(e) =>
            setForm({ ...form, id_rol: e.target.value })
          }
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button type="submit">
          {editando ? "Actualizar Usuario" : "Guardar Usuario"}
        </button>

        {editando && (
          <button
            type="button"
            onClick={limpiar}
            style={{ marginLeft: "10px" }}
          >
            Cancelar
          </button>
        )}
      </form>

      <hr />

      <h2>Lista de Usuarios</h2>

      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>ID Empleado</th>
            <th>ID Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id_usuario}>
              <td>{u.id_usuario}</td>
              <td>{u.nombre}</td>
              <td>{u.usuario}</td>
              <td>{u.correo}</td>
              <td>{u.id_empleado}</td>
              <td>{u.id_rol}</td>
              <td>
                <button onClick={() => editar(u)}>
                  Editar
                </button>

                <button
                  onClick={() => eliminar(u.id_usuario)}
                  style={{ marginLeft: "5px" }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;