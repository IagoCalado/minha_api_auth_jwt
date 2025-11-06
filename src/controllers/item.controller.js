const Item = require('../models/item.model');

const getAllItems = async (req, res) => {
  try {
    const items = Item.findByUserId(req.userId);
    
    res.json({
      message: 'Produtos listados com sucesso',
      items,
      count: items.length
    });
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = Item.findById(id, req.userId);
    
    if (!item) {
      return res.status(404).json({
        error: 'Produto não encontrado'
      });
    }

    res.json({
      message: 'Produto encontrado',
      item
    });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Validação básica
    if (!name || !price) {
      return res.status(400).json({
        error: 'Nome e preço são obrigatórios'
      });
    }

    // Validação de preço
    if (isNaN(price) || parseFloat(price) < 0) {
      return res.status(400).json({
        error: 'Preço deve ser um número válido e não negativo'
      });
    }

    const itemData = {
      name,
      description: description || '',
      price,
      category: category || 'Geral'
    };

    const item = Item.create(itemData, req.userId);

    res.status(201).json({
      message: 'Produto criado com sucesso',
      item
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    // Validação de preço se fornecido
    if (price !== undefined && (isNaN(price) || parseFloat(price) < 0)) {
      return res.status(400).json({
        error: 'Preço deve ser um número válido e não negativo'
      });
    }

    const updatedItem = Item.update(id, req.body, req.userId);

    if (!updatedItem) {
      return res.status(404).json({
        error: 'Produto não encontrado'
      });
    }

    res.json({
      message: 'Produto atualizado com sucesso',
      item: updatedItem
    });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = Item.delete(id, req.userId);

    if (!deleted) {
      return res.status(404).json({
        error: 'Produto não encontrado'
      });
    }

    res.json({
      message: 'Produto deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};