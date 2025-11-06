const app = require('./app');

const PORT = process.env.PORT || 3000;

// Verificar se JWT_SECRET está configurado
if (!process.env.JWT_SECRET) {
  console.error('ERRO: JWT_SECRET não está configurado no arquivo .env');
  process.exit(1);
}

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 API disponível em: http://localhost:${PORT}`);
  console.log(`📋 Documentação em: http://localhost:${PORT}`);
  console.log(`🔧 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

// Tratamento graceful de encerramento
process.on('SIGTERM', () => {
  console.log('📦 Recebido SIGTERM. Encerrando servidor graciosamente...');
  server.close(() => {
    console.log('✅ Servidor encerrado.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('📦 Recebido SIGINT. Encerrando servidor graciosamente...');
  server.close(() => {
    console.log('✅ Servidor encerrado.');
    process.exit(0);
  });
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

module.exports = server;