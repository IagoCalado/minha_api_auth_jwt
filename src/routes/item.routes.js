const express = require('express');
const router = express.Router();
const { 
  getAllItems, 
  getItemById, 
  createItem, 
  updateItem, 
  deleteItem 
} = require('../controllers/item.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');

// Todas as rotas de itens são protegidas
router.use(verifyJWT);

// GET /items - Listar todos os produtos do usuário
router.get('/', getAllItems);

// GET /items/:id - Obter produto específico
router.get('/:id', getItemById);

// POST /items - Criar novo produto
router.post('/', createItem);

// PUT /items/:id - Atualizar produto
router.put('/:id', updateItem);

// DELETE /items/:id - Deletar produto
router.delete('/:id', deleteItem);

module.exports = router;