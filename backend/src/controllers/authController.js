const login = async (req, res) => {
  const { correo, clave } = req.body;

  try {
    // Usuario de prueba
    if (correo === "admin@admin.com" && clave === "123456") {
      return res.json({
        token: "token_prueba",
        usuario: {
          correo
        }
      });
    }

    return res.status(401).json({
      mensaje: "Credenciales incorrectas"
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  login
};