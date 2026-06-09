import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // ✅ Esta línea es la que conecta, estaba bien

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      // ✅ Enviamos los datos tal cual los pide tu backend
      const respuesta = await api.post("/auth/login", {
        correo: correo,
        clave: password // 🔴 TU BACKEND PIDE "clave", TU CÓDIGO MANDABA "password" -> AQUÍ ESTABA EL ERROR!
      });

      if (respuesta.data?.token) {
        localStorage.setItem("token", respuesta.data.token); // Guardamos el acceso
        alert("¡Bienvenido!");
        navigate("/productos"); // Ir a la página principal
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f4f4",
      }}
    >
      <form
        onSubmit={iniciarSesion}
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "300px",
        }}
      >
        <h1>Acceso</h1>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
          required
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
          }}
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;