const mongoose = require('mongoose');

const profesionalSchema = new mongoose.Schema(
  {
    profesionalId: { type: Number, required: true }, // Equivalente a la clave primaria
    nombre: { type: String, required: true, maxlength: 100 },
    colegioId: { type: Number, required: false }, // Clave foránea opcional
    email: { type: String, required: true, unique: true }, // Índice único para evitar duplicados
    telefono: { type: String, required: false }, // Número de teléfono opcional
    identificacion: { type: String, maxlength: 50, required: false },
    passwordHash: { type: String, required: true }, // Contraseña hasheada
    fechaEmisionCredencial: { type: Date, required: false }, // Usar Date en lugar de DateOnly
    estadoCredencial: { type: String, maxlength: 50, required: false },
    cargo: { type: String, maxlength: 100, required: false }, // Nuevo campo
    mensajeLeidos: [
      {
        type: mongoose.Schema.Types.ObjectId, // Relación con otra colección
        ref: 'MensajeLeido',
        required: false,
      },
    ],
  },
  { timestamps: true } // Agrega createdAt y updatedAt automáticamente
);

module.exports = mongoose.model('Profesional', profesionalSchema);
