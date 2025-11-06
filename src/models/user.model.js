const bcrypt = require('bcryptjs');

class User {
  constructor() {
    this.users = []; // Simulando um banco de dados em memória
    this.nextId = 1;
  }

  async create(userData) {
    const { username, email, password } = userData;
    
    // Verificar se o usuário já existe
    const existingUser = this.users.find(user => 
      user.email === email || user.username === username
    );
    
    if (existingUser) {
      throw new Error('Usuário já existe');
    }

    // Hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = {
      id: this.nextId++,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    this.users.push(user);
    
    // Retornar usuário sem a senha
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  async findByUsername(username) {
    return this.users.find(user => user.username === username);
  }

  async findById(id) {
    const user = this.users.find(user => user.id === parseInt(id));
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = new User();