const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const itemRoutes = require('./routes/item.routes');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de log para desenvolvimento
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: 'API de Catálogo de Produtos',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login',
        profile: 'GET /auth/profile (protegido)'
      },
      items: {
        list: 'GET /items (protegido)',
        get: 'GET /items/:id (protegido)',
        create: 'POST /items (protegido)',
        update: 'PUT /items/:id (protegido)',
        delete: 'DELETE /items/:id (protegido)'
      }
    }
  });
});

// Rotas da API
app.use('/auth', authRoutes);
app.use('/items', itemRoutes);

// Middleware de tratamento de rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.originalUrl
  });
});

// Middleware de tratamento de erros global
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo deu errado'
  });
});

module.exports = app;