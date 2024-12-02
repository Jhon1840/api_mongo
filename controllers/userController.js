const User = require('../models/User'); // Asegúrate de tener un modelo definido para User
const bcrypt = require('bcryptjs');

// **Crear usuario**
exports.createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      nombre: req.body.nombre,
      email: req.body.email,
      password: hashedPassword,
      estadoCredencial: req.body.estadoCredencial || "Activo", // Valor por defecto
      cargo: req.body.cargo || "Sin definir", // Valor por defecto
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// **Login de usuario**
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      // Comparar la contraseña ingresada con la contraseña hasheada en la base de datos
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).json(user); // Usuario autenticado correctamente
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

// **Obtener todos los usuarios**
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **Obtener usuario por ID**
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **Actualizar usuario**
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// **Eliminar usuario**
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
