const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    estadoCredencial: { type: String, maxlength: 50, default: "Activo" },
    cargo: { type: String, maxlength: 100, default: "Sin definir" },
    fechaEmisionCredencial: { type: Date, required: false },
  },
  { timestamps: true } // Manejo automático de `createdAt` y `updatedAt`
);

module.exports = mongoose.model("User", userSchema);
