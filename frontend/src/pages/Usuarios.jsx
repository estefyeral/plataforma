import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Usuarios() {
const [usuarios, setUsuarios] = useState([]);
const [nombre, setNombre] = useState("");
const [correo, setCorreo] = useState("");
// ✅ Estados nuevos para EDITAR
const [editandoId, setEditandoId] = useState(null);
const [nombreEdit, setNombreEdit] = useState("");
const [correoEdit, setCorreoEdit] = useState("");

const agregarUsuario = () => {
if(nombre === "" || correo === ""){
alert("Todos los campos son obligatorios");
return;
}
const nuevoUsuario = {
id: Date.now(),
nombre,
correo
};
setUsuarios([...usuarios, nuevoUsuario]);
setNombre("");
setCorreo("");
};

const eliminarUsuario = (id) => {
const nuevosUsuarios = usuarios.filter(
(usuario) => usuario.id !== id
);
setUsuarios(nuevosUsuarios);
};

// ✅ FUNCIÓN NUEVA: Preparar edición
const iniciarEdicion = (usuario) => {
  setEditandoId(usuario.id);
  setNombreEdit(usuario.nombre);
  setCorreoEdit(usuario.correo);
};

// ✅ FUNCIÓN NUEVA: Guardar cambios
const guardarEdicion = () => {
  if(nombreEdit === "" || correoEdit === ""){
    alert("Todos los campos son obligatorios");
    return;
  }
  const actualizados = usuarios.map(usuario => {
    if(usuario.id === editandoId){
      return {...usuario, nombre: nombreEdit, correo: correoEdit};
    }
    return usuario;
  });
  setUsuarios(actualizados);
  setEditandoId(null); // Salir del modo edición
  setNombreEdit("");
  setCorreoEdit("");
};

return (
<>
<Navbar />
<div
style={{
padding: "20px",
maxWidth: "500px",
margin: "0 auto"
}}
>
<h1
style={{
textAlign: "center",
marginBottom: "20px",
fontSize: "35px"
}}
>
REGISTRAR USUARIOS
</h1>
<input
type="text"
placeholder="Nombre"
value={nombre}
onChange={(e) => setNombre(e.target.value)}
style={{
width: "100%",
padding: "10px",
marginBottom: "10px"
}}
/>
<input
type="email"
placeholder="Correo"
value={correo}
onChange={(e) => setCorreo(e.target.value)}
style={{
width: "100%",
padding: "10px",
marginBottom: "10px"
}}
/>
<button onClick={agregarUsuario}>
Agregar Usuario
</button>

{/* ✅ FORMULARIO DE EDICIÓN - APARECE CUANDO SE EDITA */}
{editandoId && (
  <div style={{border:"1px solid blue", padding:"10px", margin:"15px 0", borderRadius:"5px"}}>
    <h3>Editar Usuario</h3>
    <input
      type="text"
      placeholder="Nuevo nombre"
      value={nombreEdit}
      onChange={(e) => setNombreEdit(e.target.value)}
      style={{width:"100%", padding:"10px", marginBottom:"10px"}}
    />
    <input
      type="email"
      placeholder="Nuevo correo"
      value={correoEdit}
      onChange={(e) => setCorreoEdit(e.target.value)}
      style={{width:"100%", padding:"10px", marginBottom:"10px"}}
    />
    <button onClick={guardarEdicion} style={{marginRight:"10px", background:"green", color:"white", border:"none", padding:"5px 10px"}}>Guardar Cambios</button>
    <button onClick={() => setEditandoId(null)} style={{background:"gray", color:"white", border:"none", padding:"5px 10px"}}>Cancelar</button>
  </div>
)}

<hr />
<h2>LISTA DE USUARIOS</h2>
{
usuarios.length === 0
? <p>No hay usuarios registrados</p>
: usuarios.map((usuario) => (
<div
key={usuario.id}
style={{
border: "1px solid #ccc",
padding: "10px",
marginBottom: "10px"
}}
>
<p>
{usuario.nombre}
</p>
<p>
{usuario.correo}
</p>
<button
onClick={() =>
eliminarUsuario(usuario.id)}
style={{marginRight:"8px", background:"red", color:"white", border:"none", padding:"5px 10px"}}
>
Eliminar
</button>
{/* ✅ BOTÓN EDITAR NUEVO */}
<button
onClick={() => iniciarEdicion(usuario)}
style={{background:"orange", color:"white", border:"none", padding:"5px 10px"}}
>
Editar
</button>
</div>
))
}
</div>
<Footer />
</>
);
}
export default Usuarios;