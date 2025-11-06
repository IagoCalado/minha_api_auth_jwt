class Item {
  constructor() {
    this.items = []; // Simulando um banco de dados em memória
    this.nextId = 1;
  }

  create(itemData, userId) {
    const { name, description, price, category } = itemData;
    
    const item = {
      id: this.nextId++,
      name,
      description,
      price: parseFloat(price),
      category,
      userId: parseInt(userId),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.items.push(item);
    return item;
  }

  findByUserId(userId) {
    return this.items.filter(item => item.userId === parseInt(userId));
  }

  findById(id, userId = null) {
    const item = this.items.find(item => item.id === parseInt(id));
    
    // Se userId for fornecido, verificar se o item pertence ao usuário
    if (item && userId && item.userId !== parseInt(userId)) {
      return null;
    }
    
    return item;
  }

  update(id, itemData, userId) {
    const itemIndex = this.items.findIndex(item => 
      item.id === parseInt(id) && item.userId === parseInt(userId)
    );
    
    if (itemIndex === -1) {
      return null;
    }

    const { name, description, price, category } = itemData;
    
    this.items[itemIndex] = {
      ...this.items[itemIndex],
      name: name || this.items[itemIndex].name,
      description: description || this.items[itemIndex].description,
      price: price ? parseFloat(price) : this.items[itemIndex].price,
      category: category || this.items[itemIndex].category,
      updatedAt: new Date()
    };

    return this.items[itemIndex];
  }

  delete(id, userId) {
    const itemIndex = this.items.findIndex(item => 
      item.id === parseInt(id) && item.userId === parseInt(userId)
    );
    
    if (itemIndex === -1) {
      return false;
    }

    this.items.splice(itemIndex, 1);
    return true;
  }

  findAll() {
    return this.items;
  }
}

module.exports = new Item();