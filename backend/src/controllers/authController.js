const db = require("../config/db");

const login = async (req, res) => {
  const { correo, clave } = req.body;

  try {
    const [usuarios] = await db.query(
      "SELECT * FROM usuarios WHERE correo = ? AND password = ?",
      [correo, clave]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({
        mensaje: "Correo o contraseña incorrectos",
      });
    }

    const usuario = usuarios[0];

    res.json({
      token: "token_prueba",
      usuario: {
          id: usuario.id_usuario,
          nombre: usuario.nombre,
          correo: usuario.correo,
          id_empleado: usuario.id_empleado,
          id_rol: usuario.id_rol
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error del servidor",
    });
  }
};

module.exports = {
  login,
};