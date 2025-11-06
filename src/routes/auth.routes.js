const express = require('express');
const router = express.Router();
const { register, login, profile } = require('../controllers/auth.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');

// Rota para registrar usuário
router.post('/register', register);

// Rota para login
router.post('/login', login);

// Rota para obter perfil do usuário (protegida)
router.get('/profile', verifyJWT, profile);

module.exports = router;