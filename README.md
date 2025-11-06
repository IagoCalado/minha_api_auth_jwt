# minha_api_auth_jwt
# API de Catálogo de Produtos com JWT

Uma API REST completa para gerenciamento de catálogo de produtos com autenticação JWT implementada em Node.js.

## 🚀 Funcionalidades

- ✅ Autenticação com JWT
- ✅ Registro e login de usuários
- ✅ Hash seguro de senhas com BCrypt
- ✅ Middleware de proteção de rotas
- ✅ CRUD completo de produtos
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Variáveis de ambiente para segurança

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **JWT (jsonwebtoken)** - Autenticação
- **BCrypt** - Hash de senhas
- **Dotenv** - Variáveis de ambiente
- **CORS** - Cross-Origin Resource Sharing

## 📁 Estrutura do Projeto

```
project/
├── .env                    # Variáveis de ambiente
├── package.json           # Dependências e scripts
├── README.md              # Documentação
└── src/
    ├── app.js             # Configuração do Express
    ├── server.js          # Inicialização do servidor
    ├── routes/
    │   ├── auth.routes.js    # Rotas de autenticação
    │   └── item.routes.js    # Rotas de produtos
    ├── controllers/
    │   ├── auth.controller.js  # Controlador de autenticação
    │   └── item.controller.js  # Controlador de produtos
    ├── middlewares/
    │   └── auth.middleware.js  # Middleware JWT
    └── models/
        ├── user.model.js     # Modelo de usuário
        └── item.model.js     # Modelo de produto
```

## 🚦 Como Executar

### 1. Instalação das Dependências
```bash
npm install
```

### 2. Configuração das Variáveis de Ambiente
O arquivo `.env` já está configurado com valores padrão. Em produção, altere o `JWT_SECRET`:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=seu_jwt_secret_super_seguro_aqui_12345678901234567890
API_VERSION=1.0.0
```

### 3. Iniciar o Servidor
```bash
# Modo produção
npm start

# Modo desenvolvimento (com nodemon)
npm run dev
```

O servidor estará disponível em: `http://localhost:3000`

## 📊 Endpoints da API

### 🔐 Autenticação

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/auth/register` | Registrar usuário | ❌ |
| POST | `/auth/login` | Login do usuário | ❌ |
| GET | `/auth/profile` | Perfil do usuário | ✅ |

### 📦 Produtos

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/items` | Listar produtos do usuário | ✅ |
| GET | `/items/:id` | Obter produto específico | ✅ |
| POST | `/items` | Criar novo produto | ✅ |
| PUT | `/items/:id` | Atualizar produto | ✅ |
| DELETE | `/items/:id` | Deletar produto | ✅ |

## 💡 Exemplos de Uso

### 1. Registrar Usuário
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "joao",
    "email": "joao@email.com",
    "password": "123456"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "password": "123456"
  }'
```

### 3. Criar Produto (com token)
```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "name": "Notebook Dell",
    "description": "Notebook para programação",
    "price": 2500.99,
    "category": "Eletrônicos"
  }'
```

### 4. Listar Produtos (com token)
```bash
curl -X GET http://localhost:3000/items \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 🔒 Segurança

- **Senhas**: Armazenadas com hash BCrypt (salt rounds: 10)
- **JWT**: Tokens expiram em 24 horas
- **Variáveis de Ambiente**: JWT_SECRET protegido
- **Validação**: Entrada de dados validada
- **CORS**: Configurado para requisições cross-origin

## 📝 Validações

### Usuário
- **Username**: Obrigatório
- **Email**: Obrigatório e formato válido
- **Password**: Mínimo 6 caracteres

### Produto
- **Name**: Obrigatório
- **Price**: Obrigatório, numérico e não negativo
- **Description**: Opcional
- **Category**: Opcional (padrão: "Geral")

## 🚨 Tratamento de Erros

A API retorna erros padronizados:

```json
{
  "error": "Descrição do erro"
}
```

**Códigos de Status:**
- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `401` - Não autorizado
- `404` - Não encontrado
- `409` - Conflito (usuário já existe)
- `500` - Erro interno do servidor

## 🧪 Testando a API

1. **Inicie o servidor**: `npm start`
2. **Acesse**: `http://localhost:3000`
3. **Use um cliente HTTP** (Postman, Insomnia, curl)
4. **Registre um usuário** em `/auth/register`
5. **Faça login** em `/auth/login` para obter o token
6. **Use o token** no header `Authorization: Bearer <token>`

## 🎯 Próximos Passos

- [ ] Integração com banco de dados real (MongoDB/PostgreSQL)
- [ ] Paginação nos endpoints de listagem
- [ ] Upload de imagens para produtos
- [ ] Filtros e busca avançada
- [ ] Testes automatizados
- [ ] Documentação com Swagger
- [ ] Rate limiting
- [ ] Logs estruturados

## 📄 Licença

ISC License

---

**Desenvolvido para a atividade de API com Segurança (JWT)**
