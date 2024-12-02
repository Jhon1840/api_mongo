const express = require('express');
const router = express.Router();
const { createUser, loginUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');

// Endpoints
router.post('/', createUser); // Crear usuario
router.post('/login', loginUser); // Login de usuario
router.get('/', getUsers); // Obtener todos los usuarios
router.get('/:id', getUserById); // Obtener usuario por ID
router.put('/:id', updateUser); // Actualizar usuario
router.delete('/:id', deleteUser); // Eliminar usuario

module.exports = router;
