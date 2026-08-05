import { useEffect, useState } from "react";
import {
  obtenerProveedores,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
} from "../services/api";

function Proveedores() {

  // ==========================
  // ESTADOS
  // ==========================

  const [proveedores, setProveedores] = useState([]);

  const [nombre, setNombre] = useState("");

  const [telefono, setTelefono] = useState("");

  const [direccion, setDireccion] = useState("");

  const [editando, setEditando] = useState(false);

  const [idProveedor, setIdProveedor] = useState(null);

  // ==========================
  // CARGAR PROVEEDORES
  // ==========================

  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = async () => {

    try {

      const res = await obtenerProveedores();

      setProveedores(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  // ==========================
  // GUARDAR PROVEEDOR
  // ==========================

  const guardarProveedor = async () => {

    if (nombre.trim() === "") {
      alert("Ingrese el nombre del proveedor");
      return;
    }

    try {

      const datos = {
        nombre,
        telefono,
        direccion
      };

      if (editando) {

        await actualizarProveedor(idProveedor, datos);

        alert("Proveedor actualizado correctamente");

      } else {

        await crearProveedor(datos);

        alert("Proveedor registrado correctamente");

      }

      setNombre("");
      setTelefono("");
      setDireccion("");

      setEditando(false);
      setIdProveedor(null);

      cargarProveedores();

    } catch (error) {

      console.error(error);

      alert("Error al guardar el proveedor");

    }

  };

  // ==========================
  // EDITAR
  // ==========================

  const editarProveedor = (proveedor) => {

    setIdProveedor(proveedor.id_proveedor);

    setNombre(proveedor.nombre);

    setTelefono(proveedor.telefono);

    setDireccion(proveedor.direccion);

    setEditando(true);

  };

  // ==========================
  // ELIMINAR
  // ==========================

  const borrarProveedor = async (id) => {

    if (!window.confirm("¿Desea eliminar este proveedor?")) return;

    try {

      await eliminarProveedor(id);

      cargarProveedores();

    } catch (error) {

      console.error(error);

      alert("No fue posible eliminar el proveedor");

    }

  };
  return (

    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Gestión de Proveedores
      </h1>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px"
        }}
      >

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={guardarProveedor}
          style={styles.btnGuardar}
        >
          {editando ? "Actualizar" : "Guardar"}
        </button>

      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >

        <thead>

          <tr>

            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Teléfono</th>
            <th style={styles.th}>Dirección</th>
            <th style={styles.th}>Acciones</th>

          </tr>

        </thead>

        <tbody>

          {proveedores.map((proveedor) => (

            <tr key={proveedor.id_proveedor}>

              <td style={styles.td}>{proveedor.id_proveedor}</td>

              <td style={styles.td}>{proveedor.nombre}</td>

              <td style={styles.td}>{proveedor.telefono}</td>

              <td style={styles.td}>{proveedor.direccion}</td>

              <td style={styles.td}>

                <button
                  onClick={() => editarProveedor(proveedor)}
                  style={styles.btnEditar}
                >
                  Editar
                </button>

                <button
                  onClick={() => borrarProveedor(proveedor.id_proveedor)}
                  style={styles.btnEliminar}
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

const styles = {

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    boxSizing: "border-box"
  },

  th: {
    background: "#1e293b",
    color: "white",
    border: "1px solid #ddd",
    padding: "10px"
  },

  td: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center"
  },

  btnGuardar: {
    background: "green",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px"
  },

  btnEditar: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "6px 12px",
    marginRight: "5px",
    cursor: "pointer",
    borderRadius: "5px"
  },

  btnEliminar: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "5px"
  }

};

export default Proveedores;