const Profesional = require('../models/Profesional'); // Asegúrate de tener un modelo definido para Profesional
const bcrypt = require('bcryptjs');

// **Crear Profesional**
exports.createProfesional = async (req, res) => {
  try {
    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Crear nuevo Profesional
    const profesional = new Profesional({
      nombre: req.body.nombre,
      email: req.body.email,
      password: hashedPassword,
      estadoCredencial: req.body.estadoCredencial || "Activo", // Valor por defecto
      cargo: req.body.cargo || "Sin definir", // Valor por defecto
      telefono: req.body.telefono || "",
      identificacion: req.body.identificacion || "",
      fechaEmisionCredencial: req.body.fechaEmisionCredencial || new Date(),
    });

    // Guardar el nuevo profesional en la base de datos
    await profesional.save();
    res.status(201).json(profesional);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// **Login de Profesional**
exports.loginProfesional = async (req, res) => {
  const { email, password } = req.body;
  try {
    const profesional = await Profesional.findOne({ email });
    if (profesional) {
      // Comparar la contraseña ingresada con la contraseña hasheada en la base de datos
      const isMatch = await bcrypt.compare(password, profesional.password);
      if (isMatch) {
        res.status(200).json(profesional); // Profesional autenticado correctamente
      } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **Obtener todos los Profesionales**
exports.getProfesionales = async (req, res) => {
  try {
    const profesionales = await Profesional.find();
    res.status(200).json(profesionales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **Obtener Profesional por ID**
exports.getProfesionalById = async (req, res) => {
  try {
    const profesional = await Profesional.findById(req.params.id);
    if (profesional) {
      res.status(200).json(profesional);
    } else {
      res.status(404).json({ message: 'Profesional no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **Actualizar Profesional**
exports.updateProfesional = async (req, res) => {
  try {
    const profesional = await Profesional.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(profesional);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// **Eliminar Profesional**
exports.deleteProfesional = async (req, res) => {
  try {
    await Profesional.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Profesional eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
