const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validação básica
    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Username, email e password são obrigatórios'
      });
    }

    // Validação de email simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email inválido'
      });
    }

    // Validação de senha (mínimo 6 caracteres)
    if (password.length < 6) {
      return res.status(400).json({
        error: 'A senha deve ter pelo menos 6 caracteres'
      });
    }

    // Criar usuário
    const user = await User.create({ username, email, password });

    // Gerar token
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user,
      accessToken: token
    });

  } catch (error) {
    if (error.message === 'Usuário já existe') {
      return res.status(409).json({ error: error.message });
    }

    console.error('Erro no registro:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email e password são obrigatórios'
      });
    }

    // Buscar usuário por email
    const user = await User.findByEmail(email);
    
    if (!user) {
      return res.status(401).json({
        error: 'Credenciais inválidas'
      });
    }

    // Verificar senha
    const isValidPassword = await User.validatePassword(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Credenciais inválidas'
      });
    }

    // Gerar token
    const token = generateToken(user.id);

    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login realizado com sucesso',
      user: userWithoutPassword,
      accessToken: token
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

const profile = async (req, res) => {
  try {
    // O usuário já está disponível em req.user através do middleware
    res.json({
      user: req.user
    });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

module.exports = {
  register,
  login,
  profile
};