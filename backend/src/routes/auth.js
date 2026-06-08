const express = require("express");
const router = express.Router();
router.post("/login", async (req, res) => {
const { correo, password } = req.body;
if (
correo === "admin@gmail.com" &&
password === "123456"
) {
return res.json({
mensaje: "Login correcto"
});
}
res.status(401).json({
mensaje: "Credenciales incorrectas"
});
});
module.exports = router;